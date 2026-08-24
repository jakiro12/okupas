import { Text, TouchableOpacity, View } from "react-native"
import styles from '../styles/navbar-styles'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { router } from "expo-router";

const NavigationBar=()=>{
    return(
        <View
        style={styles.container}
        >
            <TouchableOpacity
            onPress={()=>router.push('/')}
            style={styles.btnContainer}
            >
            <FontAwesome6
                    name="house"
                    size={24}
                    color="#2563EB"
                    iconStyle="solid"
                    />
                <Text
                   style={styles.btnText}
                >Inicio</Text>
            </TouchableOpacity>
               <TouchableOpacity
               onPress={()=>router.push('/list/inspectionsList')}
            style={styles.btnContainer}
            >
                <FontAwesome6
                    name="file-invoice"
                    size={24}
                    color="#2563EB"
                    iconStyle="solid"
                    />
                <Text
                   style={styles.btnText}
                >Inspecciones</Text>
            </TouchableOpacity>
              <TouchableOpacity
            style={styles.btnContainer}
            >
                 <FontAwesome6
                    name="file-circle-exclamation"
                    size={24}
                    color="#2563EB"
                    iconStyle="solid"
                    />
                <Text
                   style={styles.btnText}
                >Pendientes</Text>
            </TouchableOpacity>
              <TouchableOpacity
            style={styles.btnContainer}
            >
                <FontAwesome6
                    name="gear"
                    size={24}
                    color="#2563EB"
                    iconStyle="solid"
                    />
                <Text
                    style={styles.btnText}
                >Configuracion</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NavigationBar