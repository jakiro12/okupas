import { useEffect, useState } from "react";
import { Alert, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CameraService, { CameraResult } from "@/services/camera/CameraService";
import ImageProcessor from "@/services/image/ImageProcessor";
import styles from '../../../styles/photo-screen-styles'
import FileSystemService from "@/services/fyilesystem/FileSystemService";
import { router, useLocalSearchParams } from "expo-router";
import { Photo } from "@/database/schema/PhotoTable";
import PhotoRepository from "@/database/repositories/PhotoRepository";
import * as Crypto from "expo-crypto";
import InspectionRepository from "@/database/repositories/InspectionRepository";
import { Inspection } from "@/database/schema/InspectionTable";

const CameraScreen=()=>{
    const [image, setImage] = useState<CameraResult | null>(null);
    const [savedImages, setSavedImages] = useState<Photo[]>([]);

    const { inspectionId } = useLocalSearchParams<{ inspectionId: string }>()
    console.log(inspectionId)
    const handleTakePhoto = async () => {
    const result = await CameraService.takePhoto();
switch (result?.status) {
  case "success":
    setImage(result.image!);
    break;
  case "permission-blocked":
    Alert.alert(
  "Permiso bloqueado",
  "Debes habilitar el acceso a la cámara desde los ajustes del dispositivo.",
  [
    {
      text: "Cancelar",
      style: "cancel",
    },
    {
      text: "Abrir ajustes",
      onPress: () => Linking.openSettings(),
    },
  ]
);
    break;
  case "permission-denied":
    Alert.alert(
      "Permiso requerido",
      "Debes permitir el acceso a la cámara para tomar fotografías."
    );
    break;

  case "cancelled":
    break;
}
};




const handleSaveImage = async () => {
  if (!image) {
    Alert.alert("No hay imagen");
    return;
  }

  if (!inspectionId) {
    Alert.alert("Error", "No se encontró la inspección.");
    return;
  }

  try {
    // 1. Comprimir y redimensionar
    const processedImage =
      await ImageProcessor.resizeAndCompress(image);

    // 2. Guardar archivo físicamente
    const savedImage =
      await FileSystemService.saveImage(
        inspectionId,
        processedImage
      );

    // 3. Crear registro en SQLite
    const photo: Photo = {
      id: Crypto.randomUUID(),
      inspectionId,
      fileName: savedImage.fileName!,
      uri: savedImage.uri,
      width: savedImage.width,
      height: savedImage.height,
      fileSize: savedImage.fileSize!,
      mimeType: savedImage.mimeType!,
      createdAt: new Date().toISOString(),
    };

    await PhotoRepository.create(photo);

    // 4. Actualizar lista
    setSavedImages(prev => [...prev, photo]);

    // 5. Limpiar preview
    setImage(null);

    console.log("📸 Foto guardada:", photo);

  } catch (error) {
    console.error("Error guardando imagen:", error);

    Alert.alert(
      "Error",
      "No fue posible guardar la imagen."
    );
  }
};
const handleDeleteImage = async (photo: Photo) => {
  try {
    const deleted =
      await FileSystemService.deleteImage(photo);

    if (!deleted) {
      Alert.alert(
        "Error",
        "El archivo de imagen no existe."
      );
      return;
    }

    await PhotoRepository.delete(photo.id);

    setSavedImages(prev =>
      prev.filter(item => item.id !== photo.id)
    );

  } catch (error) {
    console.error(
      "Error eliminando imagen:",
      error
    );

    Alert.alert(
      "Error",
      "No fue posible eliminar la imagen."
    );
  }
};
const handleFinishInspection = async () => {
  if (!inspectionId) {
    Alert.alert("Error", "No se encontró la inspección.");
    return;
  }

  try {
    const inspection =
      await InspectionRepository.findById(inspectionId);

    if (!inspection) {
      Alert.alert(
        "Error",
        "La inspección no existe."
      );
      return;
    }

    const updatedInspection: Inspection = {
      ...inspection,
      status: "completed",
      updatedAt: new Date().toISOString(),
    };

    await InspectionRepository.update(
      updatedInspection
    );

    router.replace("/");
  } catch (error) {
    console.error(
      "Error finalizando inspección:",
      error
    );

    Alert.alert(
      "Error",
      "No fue posible finalizar la inspección."
    );
  }
};
  useEffect(() => {
  CameraService.requestCameraPermission();
  CameraService.requestGalleryPermission();
}, []);

useEffect(() => {
  const loadPhotos = async () => {
    if (!inspectionId) return;

    try {
      const photos =
        await PhotoRepository.findByInspectionId(
          inspectionId
        );

      setSavedImages(photos);
    } catch (error) {
      console.error(
        "Error cargando fotos:",
        error
      );
    }
  };

  loadPhotos();
}, [inspectionId]);

    return(
         <SafeAreaView
                  style={{ flex: 1, backgroundColor: "black" }}
                  edges={["bottom", "top"]}
                >
                <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                >                
                <View style={styles.previewContainer}>
                    {image ? (
                    <Image
                        source={{ uri: image.uri }}
                        style={styles.image}
                    />
                    ) : (
                    <Text style={styles.emptyText}>
                        Sin imagen seleccionada
                    </Text>
                    )}
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={handleTakePhoto}
                    style={styles.button}>
                    <Text style={styles.buttonText}>📷 Tomar fotografía</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>🖼️ Elegir desde galería</Text>
                    </TouchableOpacity>                                         
                    <TouchableOpacity
                      onPress={handleSaveImage}
                      style={styles.button}
                      disabled={!image}
                    >
                      <Text style={styles.buttonText}>
                        💾 Guardar imagen
                      </Text>
                    </TouchableOpacity>                                                           
                </View>
                  {savedImages.map((photo) => (
                    <View
                      style={{width:'100%',height:'auto',display:'flex',justifyContent:'space-between',flexDirection:'row',marginBottom:10}}
                    key={photo.id}>
                      <Image
                        source={{ uri: photo.uri }}
                        style={{width:90,height:90,objectFit:'contain'}}
                      />

                      <TouchableOpacity
                        onPress={() => handleDeleteImage(photo)}
                      >
                        <Text>🗑️</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
             
          
                </ScrollView>
        </SafeAreaView>
    )
}

export default CameraScreen