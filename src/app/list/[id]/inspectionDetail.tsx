import InspectionRepository from "@/database/repositories/InspectionRepository"
import PhotoRepository from "@/database/repositories/PhotoRepository"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from '../../../styles/inspection-styles'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Inspection } from "@/database/schema/InspectionTable"
import { Photo } from "@/database/schema/PhotoTable"


const InspectionDetail=()=>{
    const [inspectionData,setInspectionData]=useState<Inspection | null>(null)
    const [inspectionPhotos,setInspectionPhotos]=useState<Photo[]>([])
        const { id } = useLocalSearchParams<{ id: string }>()
    useEffect(() => {
        const loadInspections = async () => {
          try {
            const resultData = await InspectionRepository.findById(id);
            const resultDataPhotos = await PhotoRepository.findByInspectionId(id);
            setInspectionData(resultData)
            setInspectionPhotos(resultDataPhotos)
            console.log("📋 Inspecciones:", resultData,resultDataPhotos);
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
              >Status logo</Text>
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
            <View
              style={styles.boxInspectionCurrentDataHeaderAbout}
            >
              <FontAwesome6
                      name="award"
                      size={16}
                      color="#888fa0"
                      iconStyle="solid"
                      />
              <Text>Observaciones:</Text>
              <Text

                style={{marginLeft:'auto',width:'60%'}}
              >{inspectionData?.observations}</Text>
            </View>
          </View>
          <View
            style={styles.boxInspectionCurrentDataPhotos}
          >
           <Text>fotoss tomadas</Text> 
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
              </View>
              )
            }
           </ScrollView>
          </View>
        </View>
        </SafeAreaView>
    )
}

export default InspectionDetail