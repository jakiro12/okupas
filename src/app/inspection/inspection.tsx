import {  Text, TextInput, TouchableOpacity, View,Keyboard } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from '../../styles/inspection-styles'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { router } from "expo-router";
import NavigationBar from "@/components/NavBar";
import { InspectionData } from "@/types/dataTypes";
import {  useEffect, useRef, useState } from "react";
import { Inspection } from "@/database/schema/InspectionTable";
import FileSystemService from "@/services/fyilesystem/FileSystemService";
import InspectionRepository from "@/database/repositories/InspectionRepository";
import * as Crypto from "expo-crypto";
import ObservationInput,{ObservationInputRef} from "@/components/ObservationsInput";
import AddProvince from "@/components/AddProvince";

const NewDataInspection=()=>{
    const [inspectionData,setInspectionData]=useState<InspectionData>({
        name:'',
        address:'',
        city:'',
        createdBy:'',
        observations:'',
        province:''
    })
    const [observationsFocused, setObservationsFocused] = useState(false);
    const [addProvince,setAddProvince]=useState<boolean>(false)
    const observationInputRef = useRef<ObservationInputRef>(null);
    const handleInputChange = (field:string,value:string)=>{
    setInspectionData(prev=>({...prev,[field]:value}))
  }
  const handleSetProvince=(value:string)=>{
    setInspectionData(prev=>({...prev,"province":value}))
  }
   const handleSubmitInspectionData = async () => {
  const now = new Date().toISOString();
  const inspection: Inspection = {
    id: Crypto.randomUUID(),
    status:"editing",
    name: inspectionData.name,
    createdBy: inspectionData.createdBy,
    address: inspectionData.address,
    city: inspectionData.city,
    province: inspectionData.province,
    observations: inspectionData.observations,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await InspectionRepository.create(inspection);

    await FileSystemService.createInspectionDirectory(
      inspection.id
    );

    router.push({
      pathname: "/inspection/[inspectionId]/photos",
      params: {
        inspectionId: inspection.id,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    () => {
      observationInputRef.current?.blur();
      setObservationsFocused(false);
    }
  );

  return () => {
    keyboardDidHideListener.remove();
  };
}, []);
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
                    <View
                        style={[styles.mainContainerView,{marginBottom:observationsFocused ? 'auto':0}]}
                    >
                         {!observationsFocused && (
    <>
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
                                    placeholder="Ej: inspeccion Departamento 123"
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
                                    placeholder="Ej: Juan Gomez"
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
                                    placeholder="Ej: Av. Example 123"
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
                                    placeholder="Ej: Buenos Aires"
                                />
                            </View>
                        </View>
                              <TouchableOpacity
                              onPress={()=>setAddProvince(true)}
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
                                <Text 
                                    style={[styles.inputboxContainerViewDesc,{verticalAlign:'middle',paddingLeft:4}]}
                                >
                                    {inspectionData.province === ''? 'Seleccionar Provincia' : inspectionData.province}
                                </Text>
                            </View>
                        </TouchableOpacity>

    </>
                         )}
                       
                <AddProvince
                    onCancel={()=>setAddProvince(false)}
                    visible={addProvince}
                    onChangeText={handleSetProvince}
                />
                  <ObservationInput
                        ref={observationInputRef}
                        value={inspectionData.observations}
                        onChangeText={handleSetProvince}
                        onFocus={() => setObservationsFocused(true)}
                        onBlur={() => {}}
                        expanded={observationsFocused}
                        />
                     
                        <TouchableOpacity
                            style={[styles.getPhotosBtn,{marginTop:observationsFocused ? 0 : 'auto'}]}
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
                    </View>         
                     {!observationsFocused &&                       
                        <NavigationBar/>
                       }
                         
                </View>
          </SafeAreaView>
          )
}
export default NewDataInspection