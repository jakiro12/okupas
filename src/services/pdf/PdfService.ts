import * as Print from "expo-print";
import { File } from "expo-file-system";
import InspectionRepository from "@/database/repositories/InspectionRepository";
import PhotoRepository from "@/database/repositories/PhotoRepository";
import FileSystemService from "@/services/fyilesystem/FileSystemService";
import * as Sharing from "expo-sharing";

class PdfService {
  async generateInspectionPdf(
    inspectionId: string
  ): Promise<string | null> {
    try {
      const existingPdf =
  await this.getInspectionPdf(inspectionId);

if (existingPdf) {
  console.log("El PDF ya existe:", existingPdf);
  return existingPdf;
}
      const inspection =
        await InspectionRepository.findById(inspectionId);

      if (!inspection) {
        throw new Error("No se encontró la inspección.");
      }

      const photos =
        await PhotoRepository.findByInspectionId(
          inspectionId
        );

      const photosHtml = (
  await Promise.all(
    photos.map(async (photo) => {

      const base64 =
        await FileSystemService.getImageBase64(
          photo.uri
        );

      if (!base64) {
        return `
          <div class="photo-container">
            <p>No se pudo cargar la imagen.</p>
            <div class="photo-info">
              ${photo.fileName}
            </div>
          </div>
        `;
      }

      const mimeType =
        photo.mimeType || "image/jpeg";

      return `
        <div class="photo-container">

          <img
            src="data:${mimeType};base64,${base64}"
            class="photo"
          />
        </div>
      `;
    })
  )
).join("");

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />

            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 30px;
                color: #1e293b;
              }

              h1 {
                color: #2563eb;
              }

              h2 {
                margin-top: 30px;
                color: #334155;
              }

              .header {
                border-bottom: 2px solid #2563eb;
                padding-bottom: 15px;
                margin-bottom: 25px;
              }

              .data {
                margin-bottom: 10px;
              }

              .label {
                font-weight: bold;
              }

              .observations {
                background: #f1f5f9;
                padding: 15px;
                border-radius: 8px;
                margin-top: 10px;
              }

              .photo-container {
                margin-bottom: 25px;
                page-break-inside: avoid;
              }

              .photo {
                width: 100%;
                max-height: 500px;
                object-fit: contain;
              }

              .photo-info {
                margin-top: 5px;
                font-size: 11px;
                color: #64748b;
              }
            </style>
          </head>

          <body>

            <div class="header">
              <h1>${inspection.name}</h1>

              <div class="data">
                <span class="label">Fecha:</span>
                ${inspection.createdAt}
              </div>

              <div class="data">
                <span class="label">Realizada por:</span>
                ${inspection.createdBy}
              </div>
            </div>

            <h2>Información de la inspección</h2>

            <div class="data">
              <span class="label">Dirección:</span>
              ${inspection.address || "No especificado"}
            </div>

            <div class="data">
              <span class="label">Ciudad:</span>
              ${inspection.city || "No especificado"}
            </div>

            <div class="data">
              <span class="label">Provincia:</span>
              ${inspection.province || "No especificado"}
            </div>

            <h2>Observaciones</h2>

            <div class="observations">
              ${
                inspection.observations?.trim()
                  ? inspection.observations
                  : "Sin observaciones"
              }
            </div>

            <h2>Fotografías</h2>

            ${
              photos.length > 0
                ? photosHtml
                : "<p>No se registraron fotografías.</p>"
            }

          </body>
        </html>
      `;

 const result = await Print.printToFileAsync({
  html,
  base64: true,
});

console.log("RESULT PRINT:", result);

const pdfDirectory =
  FileSystemService.getInspectionPdfDirectory(
    inspectionId
  );

if (!pdfDirectory.exists) {
  pdfDirectory.create();
}

const destinationFile = new File(
  pdfDirectory,
  `inspection-${inspectionId}.pdf`
);

await destinationFile.write(result.base64!, {
  encoding: "base64",
});

console.log(
  "PDF generado por Print:",
  result.uri
);

console.log(
  "PDF guardado permanentemente:",
  destinationFile.uri
);

console.log(
  "PDF existe:",
  destinationFile.exists
);

console.log(
  "PDF tamaño:",
  destinationFile.size
);

return destinationFile.uri;

    } catch (error) {
      console.error(
        "Error generando PDF:",
        error
      );

      return null;
    }
  }
async getInspectionPdf(
  inspectionId: string
): Promise<string | null> {
  try {
    const pdfDirectory =
      FileSystemService.getInspectionPdfDirectory(
        inspectionId
      );

    console.log(
      "DIRECTORIO PDF:",
      pdfDirectory.uri
    );

    console.log(
      "DIRECTORIO EXISTE:",
      pdfDirectory.exists
    );

    if (!pdfDirectory.exists) {
      return null;
    }

    const files = pdfDirectory.list();

    console.log(
      "ARCHIVOS EN PDF:",
      files
    );

    const pdfFile = new File(
      pdfDirectory,
      `inspection-${inspectionId}.pdf`
    );

    console.log(
      "PDF BUSCADO:",
      pdfFile.uri
    );

    console.log(
      "PDF EXISTS:",
      pdfFile.exists
    );

    if (!pdfFile.exists) {
      return null;
    }

    return pdfFile.uri;

  } catch (error) {
    console.error(
      "Error buscando PDF:",
      error
    );

    return null;
  }
}
async deleteInspectionPdf(
  inspectionId: string
): Promise<boolean> {

  const pdfDirectory =
    FileSystemService.getInspectionPdfDirectory(
      inspectionId
    );

  const pdfFile = new File(
    pdfDirectory,
    `inspection-${inspectionId}.pdf`
  );

  if (!pdfFile.exists) {
    return false;
  }

  pdfFile.delete();

  console.log("PDF eliminado:", pdfFile.uri);

  return true;
}
async openPdf(inspectionId: string): Promise<void> {
  try {
    const pdfUri =
      await this.getInspectionPdf(inspectionId);

    if (!pdfUri) {
      throw new Error("No se encontró el PDF.");
    }

    const available =
      await Sharing.isAvailableAsync();

    if (!available) {
      throw new Error(
        "La función de compartir archivos no está disponible en este dispositivo."
      );
    }

    await Sharing.shareAsync(pdfUri, {
      mimeType: "application/pdf",
      dialogTitle: "Abrir PDF",
      UTI: "com.adobe.pdf",
    });

  } catch (error) {
    console.error(
      "Error abriendo PDF:",
      error
    );
  }
}
}

export default new PdfService();