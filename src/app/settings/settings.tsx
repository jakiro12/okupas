import {  Text, TouchableOpacity, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from '../../styles/settings-styles'
import { router } from "expo-router"
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import Ionicons from "@react-native-vector-icons/ionicons";
import  MaterialIcon  from "@react-native-vector-icons/material-design-icons";
const Settings=()=>{
    
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
                                    color="#2563EB"
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
                                        color="#2563EB"
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
                                    onPress={()=>console.log('tema claro')}
                                    style={styles.themeBtns}
                                >
                                   <View
                                    style={styles.themeBtnsDesc}
                                   >
                                    <Ionicons
                                        name="sunny"
                                        size={18}
                                        color="#091431"
                                        />
                                        <Text
                                            style={styles.titleOptionsDesc}
                                        >Claro</Text>
                                    </View> 
                                    {
                                        <FontAwesome6
                                        name="circle"
                                        size={20}
                                        color="#2563EB"
                                        iconStyle="solid"
                                        />
                                    }
                                </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={()=>console.log('tema claro')}
                                    style={[styles.themeBtns,{borderTopColor:'#888fa041',borderBottomColor:'#888fa041',borderTopWidth:1,borderBottomWidth:1}]}
                                >
                                   <View
                                    style={styles.themeBtnsDesc}
                                   >
                                    <Ionicons
                                        name="moon"
                                        size={18}
                                        color="#091431"
                                        />
                                        <Text
                                            style={styles.titleOptionsDesc}
                                        >Oscuro</Text>
                                    </View> 
                                    {
                                        <FontAwesome6
                                        name="circle"
                                        size={20}
                                        color="#888fa0"
                                        iconStyle="solid"
                                        />
                                    }
                                </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={()=>console.log('tema claro')}
                                    style={styles.themeBtns}
                                >
                                   <View
                                    style={styles.themeBtnsDesc}
                                   >
                                    <Ionicons
                                        name="game-controller"
                                        size={18}
                                        color="#091431"
                                        />
                                        <Text
                                            style={styles.titleOptionsDesc}
                                        >Sistema</Text>
                                    </View> 
                                    {
                                        <FontAwesome6
                                        name="circle"
                                        size={20}
                                        color="#888fa0"
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
                                        color="#2563EB"
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
                                    style={styles.photosOptionsBoxQuality}
                                >
                                    <Text>Media</Text>
                                    <MaterialIcon
                                        name="arrow-down-bold"
                                        size={16}
                                        color="#2563EB"
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
                                        color="#2563EB"
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
                                    <Text>0 Mb</Text>
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
                                    <Text>0 Mb</Text>
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
                                        color="#091431"
                                        />
                                        <Text
                                            style={styles.titleOptionsDesc}
                                        >Sistema</Text>
                                    </View> 
                                    <Text>0 Mb</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                </View>
          </SafeAreaView>
          )
}
export default Settings