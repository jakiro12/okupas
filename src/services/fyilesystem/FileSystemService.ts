import { Directory, File, Paths } from "expo-file-system";
import { CameraResult } from "../camera/CameraService";

class FileSystemService {
  private readonly appDirectory = new Directory(Paths.document, "okupas");

  private readonly inspectionsDirectory = new Directory(
    this.appDirectory,
    "inspections"
  );

  private readonly tempDirectory = new Directory(
    this.appDirectory,
    "temp"
  );

  async initialize(): Promise<void> {
    if (!this.appDirectory.exists) {
      this.appDirectory.create();
    }

    if (!this.inspectionsDirectory.exists) {
      this.inspectionsDirectory.create();
    }

    if (!this.tempDirectory.exists) {
      this.tempDirectory.create();
    }

  }

  async createInspectionDirectory(
    inspectionId: string
  ): Promise<void> {
    const inspectionDirectory = new Directory(
      this.inspectionsDirectory,
      inspectionId
    );

    if (!inspectionDirectory.exists) {
      inspectionDirectory.create();
    }

    new Directory(inspectionDirectory, "photos").create();
    new Directory(inspectionDirectory, "thumbnails").create();
    new Directory(inspectionDirectory, "pdf").create();

  }
async deleteImage(image:CameraResult): Promise<boolean> {

  const file = new File(image.uri);

  if (file.exists === false) return false;

  file.delete();
  return true;
}
async saveImage(
  inspectionId: string,
  image: CameraResult
): Promise<CameraResult> {

  // Carpeta de la inspección
  const inspectionDirectory = new Directory(
    this.inspectionsDirectory,
    inspectionId
  );

  // Carpeta photos
  const photosDirectory = new Directory(
    inspectionDirectory,
    "photos"
  );

  // Archivo origen (cache de Expo)
  const sourceFile = new File(image.uri);

  // Archivo destino
  const destinationFile = new File(
    photosDirectory,
    sourceFile.name
  );

  // Copiar la imagen
  sourceFile.copy(destinationFile);

  const savedFile = new File(destinationFile.uri);
  return {
    uri: savedFile.uri,
    width: image.width,
    height: image.height,
    fileName: savedFile.name,
    fileSize: savedFile.size ?? null,
    mimeType: savedFile.type ?? null,
  };
}

  async getImageInfo(
    uri: string
  ): Promise<File> {

    const file = new File(uri);

    console.log(file);

    return file;
  }

  async imageExists(
    uri: string
  ): Promise<boolean> {

    const file = new File(uri);


    return file.exists;
  }
  async getImageBase64(uri: string): Promise<string | null> {
  try {
    const file = new File(uri);

    if (!file.exists) {
      console.error("La imagen no existe:", uri);
      return null;
    }

    const base64 = await file.base64();

    return base64;
  } catch (error) {
    console.error("Error leyendo imagen como Base64:", error);
    return null;
  }
}
  getInspectionPdfDirectory(
  inspectionId: string
): Directory {
  const inspectionDirectory = new Directory(
    this.inspectionsDirectory,
    inspectionId
  );

  return new Directory(
    inspectionDirectory,
    "pdf"
  );
}
async getInspectionPdf(
  inspectionId: string
): Promise<File | null> {
  const pdfDirectory =
    this.getInspectionPdfDirectory(inspectionId);

  const pdfFile = new File(
    pdfDirectory,
    `inspection-${inspectionId}.pdf`
  );

  if (!pdfFile.exists) {
    return null;
  }

  return pdfFile;
}

}

export default new FileSystemService();