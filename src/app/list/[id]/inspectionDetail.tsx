import InspectionRepository from "@/database/repositories/InspectionRepository"
import PhotoRepository from "@/database/repositories/PhotoRepository"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from '../../../styles/inspection-styles'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Inspection } from "@/database/schema/InspectionTable"
import { Photo } from "@/database/schema/PhotoTable"
import Ionicons from "@react-native-vector-icons/ionicons";
import ModalToShowInformation from "@/components/ModalToShowInformation"

const InspectionDetail=()=>{
    const [inspectionData,setInspectionData]=useState<Inspection | null>(null)
    const [inspectionPhotos,setInspectionPhotos]=useState<Photo[]>([])
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
    const [showInfoModal,setShowInfoModal]=useState<boolean>(false)
    const [selectedInfo,setSelectedInfo]=useState<{title:string,about:string}>({title:"",about:""})
        const { id } = useLocalSearchParams<{ id: string }>()
    const handleOpenPhoto = (photo: Photo) => {
            setSelectedPhoto(photo);
            setShowPhotoModal(true);
          };
    const handleOpenInfoModal=()=>{
      setSelectedInfo({
        title: "Observaciones",
        about: inspectionData?.observations ?? ""
      })
      setShowInfoModal(true)
    }
    useEffect(() => {
        const loadInspections = async () => {
          try {
            const resultData = await InspectionRepository.findById(id);
            const resultDataPhotos = await PhotoRepository.findByInspectionId(id);
            setInspectionData(resultData)
            setInspectionPhotos(resultDataPhotos)
            console.log("fotos:",resultDataPhotos);
          } catch (error) {
            console.error("Error cargando inspecciones:", error);
          }
        };
    
        loadInspections();
      }, []);
 
    return(
        <SafeAreaView
              style={{ flex: 1, backgroundColor: "black" }}
              edges={["bottom", "top"]}
            >
        <View style={styles.inspectionDetailContainer}>
           <View
          style={styles.headerInspectionsListContainer}
        >
          <TouchableOpacity
                            style={styles.arrowBackView}
                            onPress={()=>router.back()}
                        >
                                <FontAwesome6
                                    name="arrow-left"
                                    size={20}
                                    color="#2563EB"
                                    iconStyle="solid"
                                    />
                        </TouchableOpacity> 
          <Text 
            style={styles.mainTitle}
          >Inspeccion </Text>    
        </View>
          <View
            style={styles.boxInspectionCurrentData}
          >
            <View
            style={styles.boxInspectionCurrentDataHeader}
            >
              <View
                style={styles.boxInspectionCurrentDataHeaderLogo}
              >
                 <FontAwesome6
                      name="building-circle-check"
                      size={20}
                      color="#2563EB"
                      iconStyle="solid"
                      />
              </View>
              <Text
                style={styles.inspectionName}
              >{inspectionData?.name}</Text>
              <Text
                style={{marginLeft:'auto'}}
              >PDF</Text>
            </View>
            <View
              style={styles.boxInspectionCurrentDataHeaderAbout}
            >
              <FontAwesome6
                      name="user"
                      size={16}
                      color="#888fa0"
                      iconStyle="solid"
                      />
              <Text>Creada por:</Text>
              <Text
                style={{marginLeft:'auto'}}
              >{inspectionData?.createdBy}</Text>
            </View>
            <View
              style={styles.boxInspectionCurrentDataHeaderAbout}
            >
              <FontAwesome6
                      name="map-pin"
                      size={16}
                      color="#888fa0"
                      iconStyle="solid"
                      />
              <Text>Direccion:</Text>
              <Text
                style={{marginLeft:'auto'}}
              >{inspectionData?.address}</Text>
            </View>
            <View
              style={styles.boxInspectionCurrentDataHeaderAbout}
            >
              <FontAwesome6
                      name="calendar"
                      size={16}
                      color="#888fa0"
                      iconStyle="solid"
                      />
              <Text>Fecha:</Text>
              <Text
                style={{marginLeft:'auto'}}
              >{inspectionData?.createdAt}</Text>
            </View>
            <View
              style={styles.boxInspectionCurrentDataHeaderAbout}
            >
              <FontAwesome6
                      name="clock"
                      size={16}
                      color="#888fa0"
                      iconStyle="solid"
                      />
              <Text>Hora:</Text>
              <Text
                style={{marginLeft:'auto'}}
              >{inspectionData?.createdAt}</Text>
            </View>
            <TouchableOpacity
              style={styles.boxInspectionCurrentDataHeaderAbout}
              onPress={handleOpenInfoModal}
            >
              <FontAwesome6
                      name="award"
                      size={16}
                      color="#888fa0"
                      iconStyle="solid"
                      />
              <Text>Observaciones:</Text>
              <Text
                  numberOfLines={1}
                style={{marginLeft:'auto',width:'60%',color:"#0057fd"}}
              >{inspectionData?.observations}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={styles.boxInspectionCurrentDataPhotos}
          >
           <Text
            style={styles.subtitle}
           >Fotos Archivadas</Text> 
           <ScrollView
            style={{width:'100%',height:'auto'}}
            contentContainerStyle={{rowGap:10}}
           >
            {
             inspectionPhotos.length === 0 ? null : 
              inspectionPhotos.map((p)=>              
              <View
                key={p.id}
                style={styles.cardPhotoData}
              >
                <Image 
                  source={{uri:p.uri}}
                  style={styles.tinyPhoto}
                />
                <Text>{Math.ceil(p.fileSize/1024)} Kb</Text>
                <TouchableOpacity
                  onPress={()=>handleOpenPhoto(p)}
                >
                  <View
                style={styles.boxInspectionCurrentDataHeaderLogo}
              >
                <Ionicons
                    name="resize-outline"
                    size={20}
                    color="#2563EB"
                  />
              </View>
                </TouchableOpacity>
              </View>
              )
            }
           </ScrollView>
          </View>
      <Modal
  visible={showPhotoModal}
  transparent
  animationType="fade"
  onRequestClose={() => setShowPhotoModal(false)}
>
  <View
    style={{
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.9)",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <TouchableOpacity
      onPress={() => setShowPhotoModal(false)}
      style={{
        position: "absolute",
        top: 50,
        right: 20,
        zIndex: 10,
      }}
    >
      <Ionicons
        name="close"
        size={32}
        color="white"
      />
    </TouchableOpacity>

    {selectedPhoto && (
      <Image
        source={{ uri: selectedPhoto.uri }}
        style={{
          width: "90%",
          height: "80%",
          resizeMode: "contain",
        }}
      />
    )}
  </View>
</Modal>
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

export default InspectionDetail