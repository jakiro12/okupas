import {
  ImageManipulator,
  SaveFormat,
} from "expo-image-manipulator";

import type { CameraResult } from "@/services/camera/CameraService";

class ImageProcessor {
  async resizeAndCompress(image: CameraResult): Promise<CameraResult> {
    const context = ImageManipulator.manipulate(image.uri);

    // Redimensiona manteniendo la relación de aspecto.
    context.resize({
      width: 1600,
      height: null,
    });

    const renderedImage = await context.renderAsync();

    const result = await renderedImage.saveAsync({
      compress: 0.7,
      format: SaveFormat.JPEG,
    });

    return {
        uri: result.uri,
        width: result.width,
        height: result.height,
        fileName: undefined,
        fileSize: undefined,
        mimeType: undefined,
    };
  }
}

export default new ImageProcessor();