import {  Text, TouchableOpacity, View} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from '../../styles/inspection-styles'

const Settings=()=>{
    
    return(
          <SafeAreaView
                          style={{ flex: 1, backgroundColor: "black" }}
                          edges={["bottom", "top"]}
                        >

                <View
                    style={styles.container}
                >
                    <Text>Configuraciones</Text>  
                </View>
          </SafeAreaView>
          )
}
export default Settings