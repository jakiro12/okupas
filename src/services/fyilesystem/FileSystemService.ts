/*
class FileSystemService {

    private appDirectory

    private inspectionsDirectory

    private tempDirectory

    initialize()

    createInspectionFolder()

    saveImage()

    deleteImage()

    imageExists()

    getImageInfo()
}
*/
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

    console.log("📁 Directorios inicializados");
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

    console.log("📂 Carpeta creada:", inspectionDirectory.uri);
  }
async deleteImage(image:CameraResult): Promise<boolean> {

  const file = new File(image.uri);

  if (file.exists === false) return false;

  file.delete();
  console.log("imagen eliminada",file.uri)
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

  // Leer información REAL del archivo copiado
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

    console.log("Existe:", file.exists);

    return file.exists;
  }
}

export default new FileSystemService();