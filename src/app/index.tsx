import { Text, View,  TouchableOpacity } from "react-native";
import styles from '../styles/index-styles'
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationBar from "@/components/NavBar";
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import InspectionRepository from "@/database/repositories/InspectionRepository";
import { DataContext } from "./_layout";
import FileSystemService from "@/services/fyilesystem/FileSystemService";
import { formatDate } from "@/utils/dateFormat";

export default function Index() {
   const [lastFile, setLastFile] =useState<{name:string,createdAt:string}>({name:"",createdAt:""});
   const [filesQuantity,setFilesQuantity]=useState<string | number>("")
    const context = useContext(DataContext)
      if (!context) throw new Error("DataContext no está disponible")
     
       const { initialized } = context
    const loadPdfsData = async () => {
  try {
    const result = await InspectionRepository.findAll();
    setFilesQuantity(result.length)
    const completedInspections = result
      .filter(
        inspection => inspection.status === "completed"
      )
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      );

    if (completedInspections.length === 0) {
      setLastFile({
        name: "",
        createdAt: "",
      });

      return;
    }

    for (const inspection of completedInspections) {
      const pdf = await FileSystemService.getInspectionPdf(
        inspection.id
      );

      if (pdf) {
        setLastFile({
          name: inspection.name,
          createdAt: inspection.updatedAt,
        });

        return;
      }
    }

    // Hay inspecciones completas pero ninguna tiene PDF
    setLastFile({
      name: "",
      createdAt: "",
    });

  } catch (error) {
    console.error("Error cargando PDFs:", error);
  }
};
    useEffect(() => {
  if (!initialized) return;

  loadPdfsData();
}, [initialized]);
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
            >{filesQuantity}</Text>
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
            >{lastFile.name}</Text>
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
            >{formatDate(lastFile.createdAt,"date")}</Text>
            <Text
             style={styles.headerViewContainerCardText}
            >{formatDate(lastFile.createdAt,"time")}</Text>
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
               onPress={()=>router.push("/list/inspectionsList")}
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
             <TouchableOpacity
             onPress={()=>router.push('/uncompleted/uncompletedInspections')}
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
            </TouchableOpacity>
             <TouchableOpacity
              onPress={()=>router.push("/files/files")}
              style={styles.cardsDashboardBtn}
            >
              <View
                style={styles.cardsDashboardBtnLogo}
              >
                <FontAwesome6
                  name="file-pdf"
                  size={28}
                  color="#2563EB"
                  iconStyle="solid"
                  />
              </View>
              <Text
                style={styles.cardsDashboardBtnTitle}
              >Archivos</Text>
              <Text
                style={styles.cardsDashboardBtnAbout}
              >Lista de archivos generados en formato PDF</Text>
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
        </View>
      </View>
      <NavigationBar/>
    </View>
    </SafeAreaView>
  );
}


