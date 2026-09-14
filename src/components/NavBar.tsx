import { Text, TouchableOpacity, View } from "react-native"
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Href, router, usePathname } from "expo-router";
import { useTheme } from "@/theme/ThemeProvider";
import NavBarStyles from "../styles/navbar-styles";

const NavigationBar=()=>{
    const { theme } = useTheme();
  const pathname = usePathname();

  const styles = NavBarStyles(theme);

  const navigate = (route: Href) => {
    if (pathname !== route) {
     router.push(route);
    }
  };
    return(
        <View
        style={styles.container}
        >
            <TouchableOpacity
            onPress={()=>navigate('/')}
            style={styles.btnContainer}
            activeOpacity={0.7}
            >
            <FontAwesome6
                    name="house"
                    size={24}
                    color={theme.primary}
                    iconStyle="solid"
                    />
                <Text
                   style={styles.btnText}
                >Inicio</Text>
            </TouchableOpacity>
               <TouchableOpacity
            activeOpacity={0.7}
               onPress={()=>navigate('/list/inspectionsList')}
            style={styles.btnContainer}
            >
                <FontAwesome6
                    name="file-invoice"
                    size={24}
                    color={theme.primary}
                    iconStyle="solid"
                    />
                <Text
                   style={styles.btnText}
                >Inspecciones</Text>
            </TouchableOpacity>
              <TouchableOpacity
            activeOpacity={0.7}
              onPress={()=>navigate('/uncompleted/uncompletedInspections')}
            style={styles.btnContainer}
            >
                 <FontAwesome6
                    name="file-circle-exclamation"
                    size={24}
                    color={theme.primary}
                    iconStyle="solid"
                    />
                <Text
                   style={styles.btnText}
                >Pendientes</Text>
            </TouchableOpacity>
              <TouchableOpacity
            activeOpacity={0.7}
              onPress={()=>navigate('/settings/settings')}
            style={styles.btnContainer}
            >
                <FontAwesome6
                    name="gear"
                    size={24}
                    color={theme.primary}
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