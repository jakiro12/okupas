import * as ImagePicker from "expo-image-picker";

export interface CameraResult {
  uri: string;
  width: number;
  height: number;
  fileName?: string | null;
  fileSize?: number | null;
  mimeType?: string | null;
}

export type CameraStatus =
  | "success"
  | "permission-denied"
  | "cancelled"
  | "permission-blocked"
  | "blocked"
/**
 * Abre la cámara del dispositivo.
 *
 * Retorna:
 * - success
 * - permission-denied
 * - permission-blocked
 * - cancelled
 */
export type PermissionStatus =
  | "granted"
  | "denied"
  | "blocked";

export interface CameraResponse {
  status: CameraStatus;
  image?: CameraResult;
}

class CameraService {
  async requestCameraPermission(): Promise<PermissionStatus> {
    const status = await this.checkCameraPermission();

  if (status === "granted") {
    return "granted";
  }

  if (status === "blocked") {
    return "blocked";
  }

  const request = await ImagePicker.requestCameraPermissionsAsync();

  return request.granted ? "granted" : "denied";
  }

 
  async requestGalleryPermission(): Promise<PermissionStatus> {
     const status =  await this.checkGalleryPermission();

    if (status === "granted") {
    return "granted";
  }

  if (status === "blocked") {
    return "blocked";
  }

  const request =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  return request.granted ? "granted" : "denied";
  }

 
  async takePhoto(): Promise<CameraResponse> {
    const granted = await this.requestCameraPermission();
    const permission = await this.requestCameraPermission()
    if (permission === "blocked") {
  return {
    status: "permission-blocked",
  };
}

if (permission === "denied") {
  return {
    status: "permission-denied",
  };
}
    if (!granted) {
      return {
        status: "permission-denied",
      };
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
      exif: false,
    });

    if (result.canceled) {
      return {
        status: "cancelled",
      };
    }

    return {
      status: "success",
      image: this.mapAsset(result.assets[0]),
    };
  }

 
  async pickImage(): Promise<CameraResponse> {
    const granted = await this.requestGalleryPermission();
    const permission = await this.requestGalleryPermission();

    if (permission === "blocked") {
      return {
        status: "permission-blocked",
      };
    }

    if (permission === "denied") {
      return {
        status: "permission-denied",
      };
    }
    if (!granted) {
      return {
        status: "permission-denied",
      };
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
      exif: false,
    });

    if (result.canceled) {
      return {
        status: "cancelled",
      };
    }

    return {
      status: "success",
      image: this.mapAsset(result.assets[0]),
    };
  }
private async checkCameraPermission(): Promise<PermissionStatus> {
  const permission = await ImagePicker.getCameraPermissionsAsync();

  if (permission.granted) {
    return "granted";
  }

  if (!permission.canAskAgain) {
    return "blocked";
  }

  return "denied";
}

private async checkGalleryPermission(): Promise<PermissionStatus> {
  const permission =
    await ImagePicker.getMediaLibraryPermissionsAsync();

  if (permission.granted) {
    return "granted";
  }

  if (!permission.canAskAgain) {
    return "blocked";
  }

  return "denied";
}
  private mapAsset(asset: ImagePicker.ImagePickerAsset): CameraResult {
    return {
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      fileName: asset.fileName ?? null,
      fileSize: asset.fileSize ?? null,
      mimeType: asset.mimeType ?? null,
    };
  }
}


export default new CameraService();