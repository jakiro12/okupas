import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import styles from '../styles/index-styles'
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationBar from "@/components/NavBar";
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { router } from "expo-router";

export default function Index() {
  return (
     <SafeAreaView
          style={{ flex: 1, backgroundColor: "black" }}
          edges={["bottom", "top"]}
        >
    <View style={styles.container}>
      <View
        style={styles.mainInformationContainer}
      >
        <View
          style={styles.headerTitleContainer}
        >
          <Text
            style={styles.mainTitle}
          >          
            Panel Principal
          </Text>
          <Text
            style={styles.mainSubTitle}
          >
            Todo listo para tus inspecciones
          </Text>
        </View>
        <View
          style={styles.headerViewContainer}
        >
          <View
            style={styles.headerViewContainerCard}
          >
            <View
              style={styles.headerViewContainerCardIcon}
            >
               <FontAwesome6
                  name="folder"
                  size={20}
                  color="#2563EB"
                  iconStyle="solid"
                  />
            </View>
            <Text
              style={styles.headerViewContainerCardText}
            >Inspecciones</Text>
            <Text
              style={styles.headerViewContainerCardTextValue}
            >27</Text>
            <Text
             style={styles.headerViewContainerCardText}
            >Almacenadas</Text>
          </View>
            <View
            style={styles.headerViewContainerCard}
          >
            <View
              style={styles.headerViewContainerCardIcon}
            >
               <FontAwesome6
                  name="file-invoice"
                  size={20}
                  color="#2563EB"
                  iconStyle="solid"
                  />
            </View>
            <Text
              style={styles.headerViewContainerCardText}
            >Ultimo Reporte</Text>
            <Text
              style={styles.headerViewContainerCardTextValue}
            >Reporte_012.pdf</Text>
            <Text
             style={styles.headerViewContainerCardText}
            >PDF Generado</Text>
          </View>
            <View
            style={styles.headerViewContainerCard}
          >
            <View
              style={styles.headerViewContainerCardIcon}
            >
               <FontAwesome6
                  name="calendar"
                  size={20}
                  color="#2563EB"
                  iconStyle="solid"
                  />
            </View>
            <Text
              style={styles.headerViewContainerCardText}
            >Generado</Text>
            <Text
              style={styles.headerViewContainerCardTextValue}
            >31/07/2026</Text>
            <Text
             style={styles.headerViewContainerCardText}
            >10:30 a.m.</Text>
          </View>
        </View>
        <View
          style={styles.mainOptionsContainer}
        >
          <View
            style={styles.cardsDashboardContainer}
          >
            <TouchableOpacity
              onPress={()=>router.push('/inspection/inspection')}
              style={styles.cardsDashboardBtn}
            >
              <View
                style={styles.cardsDashboardBtnLogo}
              >
                <FontAwesome6
                  name="circle-plus"
                  size={34}
                  color="#2563EB"
                  iconStyle="solid"
                  />
              </View>
              <Text
                style={styles.cardsDashboardBtnTitle}
              >Nueva inspeccion</Text>
              <Text
                style={styles.cardsDashboardBtnAbout}
              >Crear una inspeccion desde cero</Text>
              <View>
              <View
                style={styles.cardsDashboardBtnLogoArrow}
              >
                <FontAwesome6
                    name="arrow-right"
                    size={20}
                    color="#2563EB"
                    iconStyle="solid"
                    />
              </View>
              </View>
            </TouchableOpacity>
               <TouchableOpacity
               onPress={()=>router.push("/list/inpectionsList")}
              style={styles.cardsDashboardBtn}
            >
              <View
                style={styles.cardsDashboardBtnLogo}
              >
                <FontAwesome6
                  name="file-invoice"
                  size={34}
                  color="#2563EB"
                  iconStyle="solid"
                  />
              </View>
              <Text
                style={styles.cardsDashboardBtnTitle}
              >Inspecciones</Text>
              <Text
                style={styles.cardsDashboardBtnAbout}
              >Ver y gestionar todas tus inspecciones</Text>
              <View>
              <View
                style={styles.cardsDashboardBtnLogoArrow}
              >
                <FontAwesome6
                    name="arrow-right"
                    size={20}
                    color="#2563EB"
                    iconStyle="solid"
                    />
              </View>
              </View>
            </TouchableOpacity>
          </View>
            <View
            style={styles.cardsDashboardContainer}
          >
             <View
              style={styles.cardsDashboardBtn}
            >
              <View
                style={styles.cardsDashboardBtnLogo}
              >
                <FontAwesome6
                  name="file-circle-exclamation"
                  size={28}
                  color="#2563EB"
                  iconStyle="solid"
                  />
              </View>
              <Text
                style={styles.cardsDashboardBtnTitle}
              >Continuar inspeccion</Text>
              <Text
                style={styles.cardsDashboardBtnAbout}
              >Retomar inspecciones sin completar</Text>
              <View>
              <View
                style={styles.cardsDashboardBtnLogoArrow}
              >
                <FontAwesome6
                    name="arrow-right"
                    size={20}
                    color="#2563EB"
                    iconStyle="solid"
                    />
              </View>
              </View>
            </View>
             <View
              style={styles.cardsDashboardBtn}
            >
              <View
                style={styles.cardsDashboardBtnLogo}
              >
                <FontAwesome6
                  name="gear"
                  size={34}
                  color="#2563EB"
                  iconStyle="solid"
                  />
              </View>
              <Text
                style={styles.cardsDashboardBtnTitle}
              >Configuracion</Text>
              <Text
                style={styles.cardsDashboardBtnAbout}
              >Ajustes de la aplicacion y preferencias</Text>
              <View>
              <View
                style={styles.cardsDashboardBtnLogoArrow}
              >
                <FontAwesome6
                    name="arrow-right"
                    size={20}
                    color="#2563EB"
                    iconStyle="solid"
                    />
              </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <NavigationBar/>
    </View>
    </SafeAreaView>
  );
}


