import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from '../../styles/inspection-styles'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { router, useLocalSearchParams } from "expo-router";
import NavigationBar from "@/components/NavBar";
import { InspectionData } from "@/types/dataTypes";
import { useEffect, useState } from "react";
import { Inspection } from "@/database/schema/InspectionTable";
import InspectionRepository from "@/database/repositories/InspectionRepository";

const EditDataInspection=()=>{
    const [loadingInspection,setLoadingInspection]=useState<boolean>(false)
    const [inspectionData,setInspectionData]=useState<InspectionData>({
        name:'',
        address:'',
        city:'',
        createdBy:'',
        observations:'',
        province:''
    })
const { inspectionId } =useLocalSearchParams<{ inspectionId: string }>();
    const handleInputChange = (field:string,value:string)=>{
    setInspectionData(prev=>({...prev,[field]:value}))
  }
const handleSubmitInspectionData = async () => {
  if (!inspectionId) {
    Alert.alert(
      "Error",
      "No se encontró el ID de la inspección."
    );
    return;
  }

  try {
    const existingInspection =
      await InspectionRepository.findById(inspectionId);

    if (!existingInspection) {
      Alert.alert(
        "Error",
        "No se encontró la inspección."
      );
      return;
    }

    const updatedInspection: Inspection = {
      ...existingInspection,
      name: inspectionData.name,
      createdBy: inspectionData.createdBy,
      address: inspectionData.address,
      city: inspectionData.city,
      province: inspectionData.province,
      observations: inspectionData.observations,

      updatedAt: new Date().toISOString(),
    };

    await InspectionRepository.update(
      updatedInspection
    );

    router.push({
      pathname: "/inspection/[inspectionId]/photos",
      params: {
        inspectionId: inspectionId,
      },
    });

  } catch (error) {
    console.error(
      "Error actualizando inspección:",
      error
    );

    Alert.alert(
      "Error",
      "No fue posible actualizar la inspección."
    );
  }
};
  useEffect(() => {
        const loadInspections = async () => {
            setLoadingInspection(true)
          try {
            const resultData = await InspectionRepository.findById(inspectionId);
            setInspectionData(
                {
                    name:resultData?.name!,
                    address:resultData?.address!,
                    city:resultData?.city!,
                    createdBy:resultData?.createdBy!,
                    observations:resultData?.observations!,
                    province:resultData?.province!
                }
            )
          } catch (error) {
            console.error("Error cargando inspecciones:", error);
          }finally{
            setLoadingInspection(false)
          }
        };
    
        loadInspections();
      }, [inspectionId]);
    return(
          <SafeAreaView
                          style={{ flex: 1, backgroundColor: "black" }}
                          edges={["bottom", "top"]}
                        >

                <View
                    style={styles.container}
                >
                    <View
                        style={styles.headerViewContainer}
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
                        <View
                            style={styles.headerViewContainerLegend}
                        >
                            <Text
                                style={styles.headerViewContainerLegendTitle}
                            >Nueva inspección</Text>
                            <Text
                                style={styles.headerViewContainerLegendDesc}
                            >Completa la Información de la inspección</Text>
                            </View>
                    </View>
                    {loadingInspection ? (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color="#0c6efd" />
    <Text style={{ marginTop: 10 }}>
      Cargando inspección...
    </Text>
  </View>
) : (
    <View
                        style={styles.mainContainerView}
                    >
                        <View
                            style={styles.inputboxContainer}
                        >
                            <Text
                                style={styles.inputboxContainerViewTitle}
                            >
                                Nombre de la inspección:
                            </Text>
                            <View
                                style={styles.inputboxContainerView}
                            >
                                <View
                                    style={styles.inputboxContainerViewLogo}
                                >
                                <FontAwesome6
                                    name="clipboard-list"
                                    size={20}
                                    color="#2563EB"
                                    iconStyle="solid"
                                    />

                                </View>
                                <TextInput 
                                    onChangeText={(t)=>handleInputChange("name",t)}
                                    style={styles.inputboxContainerViewDesc}
                                    placeholder={inspectionData.name}
                                    value={inspectionData.name}
                                />
                            </View>
                        </View>
                         <View
                            style={styles.inputboxContainer}
                        >
                            <Text
                                style={styles.inputboxContainerViewTitle}
                            >
                                Inspección realizada por:
                            </Text>
                            <View
                                style={styles.inputboxContainerView}
                            >
                                <View
                                    style={styles.inputboxContainerViewLogo}
                                >
                                <FontAwesome6
                                    name="user"
                                    size={20}
                                    color="#2563EB"
                                    iconStyle="solid"
                                    />
                                </View>
                                <TextInput                                     
                                    onChangeText={(t)=>handleInputChange("createdBy",t)}
                                    style={styles.inputboxContainerViewDesc}
                                    placeholder={inspectionData.createdBy}
                                    value={inspectionData.createdBy}
                                />
                            </View>
                        </View>
                            <View
                            style={styles.inputboxContainer}
                        >
                            <Text
                                style={styles.inputboxContainerViewTitle}
                            >
                                Direccion:
                            </Text>
                            <View
                                style={styles.inputboxContainerView}
                            >
                                <View
                                    style={styles.inputboxContainerViewLogo}
                                >
                                <FontAwesome6
                                    name="map-location"
                                    size={20}
                                    color="#2563EB"
                                    iconStyle="solid"
                                    />
                                </View>
                                <TextInput 
                                    onChangeText={(t)=>handleInputChange("address",t)}                                    
                                    style={styles.inputboxContainerViewDesc}
                                    placeholder={inspectionData.address}
                                    value={inspectionData.address}
                                />
                            </View>
                        </View>
                          <View
                            style={styles.inputboxContainer}
                        >
                            <Text
                                style={styles.inputboxContainerViewTitle}
                            >
                                Ciudad:
                            </Text>
                            <View
                                style={styles.inputboxContainerView}
                            >
                                <View
                                    style={styles.inputboxContainerViewLogo}
                                >
                                <FontAwesome6
                                    name="building"
                                    size={20}
                                    color="#2563EB"
                                    iconStyle="solid"
                                    />
                                </View>
                                <TextInput                                     
                                    onChangeText={(t)=>handleInputChange("city",t)}                                    
                                    style={styles.inputboxContainerViewDesc}
                                    placeholder={inspectionData.city}
                                    value={inspectionData.city}
                                />
                            </View>
                        </View>
                              <View
                            style={styles.inputboxContainer}
                        >
                            <Text
                                style={styles.inputboxContainerViewTitle}
                            >
                                Provincia:
                            </Text>
                            <View
                                style={styles.inputboxContainerView}
                            >
                                <View
                                    style={styles.inputboxContainerViewLogo}
                                >
                                <FontAwesome6
                                    name="flag"
                                    size={20}
                                    color="#2563EB"
                                    iconStyle="solid"
                                    />
                                </View>
                                <TextInput 
                                    onChangeText={(t)=>handleInputChange("province",t)}                                    
                                    style={styles.inputboxContainerViewDesc}
                                    placeholder={inspectionData.province}
                                    value={inspectionData.province}
                                />
                            </View>
                        </View>
                                <View
                            style={styles.inputboxContainer}
                        >
                            <Text
                                style={styles.inputboxContainerViewTitle}
                            >
                                Observaciones:
                            </Text>
                            <View
                                style={styles.inputboxContainerView}
                            >
                                <View
                                    style={styles.inputboxContainerViewLogo}
                                >
                                <FontAwesome6
                                    name="award"
                                    size={20}
                                    color="#2563EB"
                                    iconStyle="solid"
                                    />
                                </View>
                                <TextInput 
                                    onChangeText={(t)=>handleInputChange("observations",t)}                                    
                                    style={styles.inputboxContainerViewDesc}
                                    placeholder={inspectionData.observations}
                                    value={inspectionData.observations}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.getPhotosBtn}
                            onPress={handleSubmitInspectionData}  
                        >
                             <FontAwesome6
                                    name="camera"
                                    size={20}
                                    color="#eaf4fb"
                                    iconStyle="solid"
                                    />
                            <Text>Tomar fotos</Text>
                        </TouchableOpacity>
                    </View>)}                                     
                <NavigationBar/>
                </View>
          </SafeAreaView>
          )
}
export default EditDataInspection