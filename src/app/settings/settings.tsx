import {  Text, TouchableOpacity, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router} from "expo-router"
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import Ionicons from "@react-native-vector-icons/ionicons";
import  MaterialIcon  from "@react-native-vector-icons/material-design-icons";
import { useTheme } from "@/theme/ThemeProvider";
import SettingsStyles from "../../styles/settings-styles";
import { DataContext } from "../_layout";
import { useContext, useState } from "react";
import SetPhotoQuality from "@/components/ModalQualityPhotos";


const Settings=()=>{
    
    const { mode,setMode,theme } = useTheme()
 
        const [showCurrentQuality,setShowCurrentQuality]=useState<boolean>(false)
         const context = useContext(DataContext)
        if (!context) throw new Error("DataContext no está disponible")
       
         const { quality } = context
        
  const styles = SettingsStyles(theme);
    return(
          <SafeAreaView
                          style={{ flex: 1, backgroundColor: "black" }}
                          edges={["bottom", "top"]}
                        >

                <View
                    style={styles.container}
                >
                       <View
                  style={styles.headerFilesListContainer}
                >
                  <TouchableOpacity
                            style={styles.arrowBackView}
                            onPress={()=>router.back()}
                        >
                                <FontAwesome6
                                    name="arrow-left"
                                    size={20}
                                    color={theme.iconColor}
                                    iconStyle="solid"
                                    />
                        </TouchableOpacity>

            <Text
                style={styles.mainTitle}
            >
            Configuraciones
            </Text>
            </View>

                    <View
                        style={styles.mainContainerOptions}
                    >
                        <View
                            style={styles.optionsBox}
                        >
                            <View
                                style={styles.optionsBoxTitle}
                            >
                               <View
                                    style={styles.boxOptionsLogo}
                                >
                                    <Ionicons
                                        name="sunny"
                                        size={24}
                                        color={theme.iconColor}
                                        />
                                </View>     
                                <View
                                    style={styles.optionsBoxTitleDesc}
                                >
                                    <Text
                                            style={styles.titleOptionsDesc}
                                    >Apariencia</Text>
                                    <Text
                                    style={styles.titleOptionsDescAbout}
                                    >Elige como se vera la aplicacion</Text>
                                </View>
                            </View>
                            <View
                                style={styles.optionsBoxDisplay}
                            >
                                <TouchableOpacity
                                    onPress={()=>setMode("light")}
                                    style={styles.themeBtns}
                                >
                                   <View
                                    style={styles.themeBtnsDesc}
                                   >
                                    <Ionicons
                                        name="sunny"
                                        size={18}
                                        color={mode === "light" ? "#2563EB" : "#888fa0"}
                                        />
                                        <Text
                                            style={[styles.titleOptionsDesc,{color:mode === "light" ? "#2563EB" : "#888fa0"}]}
                                        >Claro</Text>
                                    </View> 
                                    {
                                        <FontAwesome6
                                        name="circle"
                                        size={20}
                                        color={mode === "light" ? "#2563EB" : "#888fa0" }                                        
                                        iconStyle="solid"
                                        />
                                    }
                                </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={()=>setMode("dark")}
                                    style={[styles.themeBtns,{borderTopColor:'#888fa041',borderBottomColor:'#888fa041',borderTopWidth:1,borderBottomWidth:1}]}
                                >
                                   <View
                                    style={styles.themeBtnsDesc}
                                   >
                                    <Ionicons
                                        name="moon"
                                        size={18}
                                        color={mode === "dark" ? "#2563EB" : "#888fa0"}
                                        />
                                        <Text
                                            style={[styles.titleOptionsDesc,{color:mode === "dark" ? "#2563EB" : "#888fa0"}]}
                                        >Oscuro</Text>
                                    </View> 
                                    {
                                        <FontAwesome6
                                        name="circle"
                                        size={20}
                                        color={mode === "dark" ? "#2563EB" : "#888fa0" }                                        
                                        iconStyle="solid"
                                        />
                                    }
                                </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={()=>setMode("system")}
                                    style={styles.themeBtns}
                                >
                                   <View
                                    style={styles.themeBtnsDesc}
                                   >
                                    <Ionicons
                                        name="game-controller"
                                        size={18}
                                        color={mode === "system" ? "#2563EB" : "#888fa0"}
                                        />
                                        <Text
                                            style={[styles.titleOptionsDesc,{color:mode === "system" ? "#2563EB" : "#888fa0"}]}
                                        >Sistema</Text>
                                    </View> 
                                    {
                                        <FontAwesome6
                                        name="circle"
                                        size={20}
                                         color={mode === "system" ? "#2563EB" : "#888fa0" }  
                                        iconStyle="solid"
                                        />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                       <View
                            style={styles.optionsBox}
                        >
                            <View
                                style={styles.optionsBoxTitle}
                            >
                               <View
                                    style={styles.boxOptionsLogo}
                                >
                                    <Ionicons
                                        name="camera"
                                        size={24}
                                        color={theme.iconColor}
                                        />
                                </View>     
                                <View
                                    style={styles.optionsBoxTitleDesc}
                                >
                                    <Text
                                            style={styles.titleOptionsDesc}
                                    >Fotografias</Text>
                                    <Text
                                    style={styles.titleOptionsDescAbout}
                                    >Configura la calidad y el editor de imagenes</Text>
                                </View>
                            </View>
                            <View
                                style={styles.optionsBoxDisplay}
                            >
                               <View
                                style={[styles.photosOptionsBox,{borderBottomColor:'#888fa041',borderBottomWidth:1}]}
                               >
                                <View
                                    style={styles.photosOptionsBoxDesc}
                                >
                                    <Text
                                            style={[styles.titleOptionsDesc,{fontWeight:'normal'}]}
                                    >Calidad de Fotografias</Text>
                                    <Text
                                    style={styles.titleOptionsDescAbout}
                                    >Equilibrio ideal entre calidad y espacio</Text>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={()=>setShowCurrentQuality(true)}
                                    style={styles.photosOptionsBoxQuality}
                                >
                                    <Text style={{color:mode=== "light" ?"#091431": "#eaf4fb"}}>{quality}</Text>
                                    <MaterialIcon
                                        name="arrow-down-bold"
                                        size={16}
                                        color={theme.primary}
                                        />
                                </TouchableOpacity>
                               </View>
                               <View
                                style={styles.photosOptionsBox}                               
                               >
                                   <View
                                    style={styles.photosOptionsBoxDesc}
                                >
                                    <Text
                                            style={[styles.titleOptionsDesc,{fontWeight:'normal'}]}
                                    >Editor de Fotografias</Text>
                                    <Text
                                    style={styles.titleOptionsDescAbout}
                                    >Permitir marcar y dibujar sobre imagenes</Text>
                                </View>
                                <TouchableOpacity

                                >
                                    <FontAwesome6
                                        name="circle"
                                        size={20}
                                        color="#888fa0"
                                        iconStyle="solid"
                                        />
                                </TouchableOpacity>
                               </View>
                            </View>
                        </View>
                         <View
                            style={styles.optionsBox}
                        >
                            <View
                                style={styles.optionsBoxTitle}
                            >
                               <View
                                    style={styles.boxOptionsLogo}
                                >
                                    <FontAwesome6
                                        name="database"
                                        size={22}
                                        color={theme.iconColor}
                                        iconStyle="solid"
                                        />
                                </View>     
                                <View
                                    style={styles.optionsBoxTitleDesc}
                                >
                                    <Text
                                            style={styles.titleOptionsDesc}
                                    >Almacenamiento</Text>
                                    <Text
                                    style={styles.titleOptionsDescAbout}
                                    >Espacio ocupado por la aplicacion</Text>
                                </View>
                            </View>
                            <View
                                style={styles.optionsBoxDisplay}
                            >
                                <TouchableOpacity
                                    onPress={()=>console.log('tema claro')}
                                    style={styles.themeBtns}
                                >
                                   <View
                                    style={styles.themeBtnsDesc}
                                   >
                                    <Ionicons
                                        name="image-sharp"
                                        size={18}
                                        color="#44c66f"
                                        />
                                        <Text
                                            style={styles.titleOptionsDesc}
                                        >Imagenes</Text>
                                    </View> 
                                    <Text
                                    style={styles.titleOptionsDesc}
                                    >0 Mb</Text>
                                </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={()=>console.log('tema claro')}
                                    style={[styles.themeBtns,{borderTopColor:'#888fa041',borderBottomColor:'#888fa041',borderTopWidth:1,borderBottomWidth:1}]}
                                >
                                   <View
                                    style={styles.themeBtnsDesc}
                                   >
                                    <Ionicons
                                        name="document-attach"
                                        size={18}
                                        color="#F40F02"
                                        />
                                        <Text
                                            style={styles.titleOptionsDesc}
                                        >PDFs</Text>
                                    </View> 
                                    <Text
                                    style={styles.titleOptionsDesc}
                                    >0 Mb</Text>
                                </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={()=>console.log('tema claro')}
                                    style={styles.themeBtns}
                                >
                                   <View
                                    style={styles.themeBtnsDesc}
                                   >
                                    <Ionicons
                                        name="file-tray"
                                        size={18}
                                        color="#000000"
                                        />
                                        <Text
                                            style={styles.titleOptionsDesc}
                                        >Sistema</Text>
                                    </View> 
                                    <Text
                                    style={styles.titleOptionsDesc}
                                    >0 Mb</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                        <SetPhotoQuality 
                            visible={showCurrentQuality}
                            onCancel={()=>setShowCurrentQuality(false)}                            
                        />
                </View>
          </SafeAreaView>
          )
}
export default Settings