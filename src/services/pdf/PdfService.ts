import * as Print from "expo-print";
import { File } from "expo-file-system";
import InspectionRepository from "@/database/repositories/InspectionRepository";
import PhotoRepository from "@/database/repositories/PhotoRepository";
import FileSystemService from "@/services/fyilesystem/FileSystemService";

class PdfService {
  async generateInspectionPdf(
    inspectionId: string
  ): Promise<string | null> {
    try {
      const inspection =
        await InspectionRepository.findById(inspectionId);

      if (!inspection) {
        throw new Error("No se encontró la inspección.");
      }

      const photos =
        await PhotoRepository.findByInspectionId(
          inspectionId
        );

      const photosHtml = photos
        .map(
          (photo) => `
            <div class="photo-container">
              <img
                src="${photo.uri}"
                class="photo"
              />

              <div class="photo-info">
                <span>${photo.fileName}</span>
              </div>
            </div>
          `
        )
        .join("");

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
      });

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

      const temporaryFile = new File(result.uri);

    await  temporaryFile.copy(destinationFile);

      console.log(
        "PDF temporal:",
        result.uri
      );

      console.log(
        "PDF guardado permanentemente:",
        destinationFile.uri
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
}

export default new PdfService();