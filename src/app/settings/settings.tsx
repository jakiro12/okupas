import {  Text, TouchableOpacity, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from '../../styles/settings-styles'
import { router } from "expo-router"
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

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
                                    <FontAwesome6
                                        name="sun"
                                        size={20}
                                        color="#2563EB"
                                        iconStyle="solid"
                                        />
                                </View>     
                                <View
                                    style={styles.optionsBoxTitleDesc}
                                >
                                    <Text
                                            style={styles.titleOptionsDesc}
                                    >Apariencia</Text>
                                    <Text
                                    style={{fontSize:12}}
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
                                    <FontAwesome6
                                        name="sun"
                                        size={18}
                                        color="#091431"
                                        iconStyle="solid"
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
                                    <FontAwesome6
                                        name="moon"
                                        size={18}
                                        color="#091431"
                                        iconStyle="solid"
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
                                    <FontAwesome6
                                        name="computer"
                                        size={18}
                                        color="#091431"
                                        iconStyle="solid"
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
                        ></View>
                        <View
                            style={styles.optionsBox}
                        ></View>
                        </View>
                </View>
          </SafeAreaView>
          )
}
export default Settings