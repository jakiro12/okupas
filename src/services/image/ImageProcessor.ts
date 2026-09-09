import {
  ImageManipulator,
  SaveFormat,
} from "expo-image-manipulator";

import type { CameraResult } from "@/services/camera/CameraService";
export type ImageQuality = "Low" | "Medium" | "High";

const IMAGE_QUALITY_CONFIG = {
  Low: {
    width: 1280,
    compress: 0.6,
  },
  Medium: {
    width: 1600,
    compress: 0.7,
  },
  High: {
    width: 2560,
    compress: 0.9,
  },
};
class ImageProcessor {
  async resizeAndCompress(
    image: CameraResult,
    quality: ImageQuality = "Medium"
  ): Promise<CameraResult> {
    const config = IMAGE_QUALITY_CONFIG[quality];

    const context = ImageManipulator.manipulate(image.uri);

    context.resize({
      width: config.width,
      height: null,
    });

    const renderedImage = await context.renderAsync();

    const result = await renderedImage.saveAsync({
      compress: config.compress,
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