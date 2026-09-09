import { useContext, useEffect, useState } from "react";
import { Alert, Image, Linking,  ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import CameraService, { CameraResult } from "@/services/camera/CameraService";
import ImageProcessor from "@/services/image/ImageProcessor";
import FileSystemService from "@/services/fyilesystem/FileSystemService";
import { router, useLocalSearchParams } from "expo-router";
import { Photo } from "@/database/schema/PhotoTable";
import PhotoRepository from "@/database/repositories/PhotoRepository";
import * as Crypto from "expo-crypto";
import InspectionRepository from "@/database/repositories/InspectionRepository";
import { Inspection } from "@/database/schema/InspectionTable";
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import ModalToShowInformation from "@/components/ModalToShowInformation";
import { useTheme } from "@/theme/ThemeProvider";
import PhotoScreenStyles from "../../../styles/photo-screen-styles";
import { DataContext } from "@/app/_layout";

const CameraScreen=()=>{
    const [image, setImage] = useState<CameraResult | null>(null);
    const [savedImages, setSavedImages] = useState<Photo[]>([]);
    const [showInfoModal,setShowInfoModal]=useState<boolean>(false)
    const [selectedInfo,setSelectedInfo]=useState<{title:string,about:string}>({title:"",about:""})
    const { inspectionId } = useLocalSearchParams<{ inspectionId: string }>()
    const { theme } = useTheme()
  const styles = PhotoScreenStyles(theme);
  const context = useContext(DataContext)
        if (!context) throw new Error("DataContext no está disponible")
       
         const { quality } = context
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
     setSelectedInfo({
        title: "Permiso requerido",
        about: "Debes permitir el acceso a la cámara para tomar fotografías.",
      });
      setShowInfoModal(true);
    break;

  case "cancelled":
    break;
}
};

const handlePickImage = async () => {
  const result = await CameraService.pickImage();

  switch (result.status) {
    case "success":
      setImage(result.image!);
      break;

    case "permission-blocked":
      Alert.alert(
        "Permiso bloqueado",
        "Debes habilitar el acceso a las fotos desde los ajustes.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Abrir ajustes",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      break;

    case "permission-denied":
     setSelectedInfo({
        title: "Permiso requerido",
        about: "Debes permitir el acceso a la galeria de imagenes.",
      });
      setShowInfoModal(true);
      break;

    case "cancelled":
      break;
  }
};


const handleSaveImage = async () => {
  if (!image) {
    setSelectedInfo({
        title: "Imagen requerida",
        about: "Debes agregar al menos una fotografía.",
      });
      setShowInfoModal(true);
    return;
  }

  if (!inspectionId) {

    setSelectedInfo({
        title: "Error",
        about: "Inspeccion no encontrada.",
      });
      setShowInfoModal(true);
    return;
  }

  try {
    const processedImage =
  await ImageProcessor.resizeAndCompress(
    image,
    quality
  );
    const savedImage =
      await FileSystemService.saveImage(
        inspectionId,
        processedImage
      );

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

    setSavedImages(prev => [...prev, photo]);
    setImage(null);
    
  } catch (error) {
    console.error("Error guardando imagen:", error);
     setSelectedInfo({
        title: "Error",
        about: "No se pudo guardar la imagen",
      });
      setShowInfoModal(true);
  }
};
const handleDeleteImage = async (photo: Photo) => {
  try {
    const deleted =
      await FileSystemService.deleteImage(photo);

    if (!deleted) {
       setSelectedInfo({
        title: "Error",
        about: "No se puede eliminar un imagen inexistente.",
      });
      setShowInfoModal(true);
      return;
    }

    await PhotoRepository.delete(photo.id);

    setSavedImages(prev =>
      prev.filter(item => item.id !== photo.id)
    );

  } catch (error) {
    console.error(
      error
    );
    setSelectedInfo({
        title: "Error",
        about: "No fue posible eliminar la imagen.",
      });
      setShowInfoModal(true); 
  }
};
const handleFinishInspection = async () => {
  if (!inspectionId) {
        setSelectedInfo({
        title: "Error",
        about: "Inspeccion no encontrada.",
      });
      setShowInfoModal(true);
    return;
  }

  try {
    const inspection =
      await InspectionRepository.findById(inspectionId);

    if (!inspection) {
          setSelectedInfo({
        title: "Error",
        about: "Inspeccion no encontrada.",
      });
      setShowInfoModal(true);
      return;
    }

    const updatedInspection: Inspection = {
      ...inspection,
      status: "completed",
      updatedAt: new Date().toISOString(),
    };

    await InspectionRepository.update(updatedInspection);

    router.replace("/");
  } catch (error) {
    console.error(
      error
    );
    setSelectedInfo({
        title: "Error",
        about: "No fue posible finalizar la inspección.",
      });
      setShowInfoModal(true);
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
              <View
                style={styles.container}
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
                    style={styles.buttonActions}>
                     <FontAwesome6
                        name="camera"
                        size={20}
                        color="#eaf4fb"
                        iconStyle="solid"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={handlePickImage}
                    style={styles.buttonActions}>
                    <FontAwesome6
                        name="image"
                        size={20}
                        color="#eaf4fb"
                        iconStyle="solid"
                        />
                    </TouchableOpacity> 
                    {image ?
                    <TouchableOpacity
                      onPress={handleSaveImage}
                      style={styles.buttonActions}
                      disabled={!image}
                    >
                      <FontAwesome6
                        name="check"
                        size={20}
                        color="#eaf4fb"
                        iconStyle="solid"
                        />
                    </TouchableOpacity>                                                           
                    :
                    null
                     }                                        
                </View>
<ScrollView
                
                style={styles.cardPhotoContainer}
                showsVerticalScrollIndicator={false}
                >    
                
                  {savedImages.map((photo) => (
                    <View
                      style={styles.cardPhotoData}
                    key={photo.id}>
                      <Image
                        source={{ uri: photo.uri }}
                        style={{width:100,height:80,objectFit:'cover'}}
                      />
                      <Text
                        style={{color:theme.text}}
                      >{photo.height > photo.width ? "Vertical" : "Panoramica"}</Text>
                      <TouchableOpacity
                        onPress={() => handleDeleteImage(photo)}
                      >
                         <FontAwesome6
                        name="trash-can"
                        size={20}
                        color={theme.primary}
                        iconStyle="solid"
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
                  {savedImages.length === 0 ? null
                  :
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleFinishInspection}
                  >
                    <Text
                    style={styles.buttonText}
                    >Generar Reporte</Text>
                  </TouchableOpacity>
                }
               <ModalToShowInformation 
                visible={showInfoModal}
                about={selectedInfo.about}
                title={selectedInfo.title}
                onCancel={()=>setShowInfoModal(false)}
              />
              </View> 
        </SafeAreaView>
    )
}

export default CameraScreen