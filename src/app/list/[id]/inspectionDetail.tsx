import InspectionRepository from "@/database/repositories/InspectionRepository"
import PhotoRepository from "@/database/repositories/PhotoRepository"
import { useLocalSearchParams } from "expo-router"
import { useEffect } from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from '../../../styles/inspection-styles'


const InspectionDetail=()=>{
        const { id } = useLocalSearchParams<{ id: string }>()
    useEffect(() => {
        const loadInspections = async () => {
          try {
            const resultData = await InspectionRepository.findById(id);
            const resultDataPhotos = await PhotoRepository.findByInspectionId(id);

            console.log("📋 Inspecciones:", resultData,resultDataPhotos);
          } catch (error) {
            console.error("Error cargando inspecciones:", error);
          }
        };
    
        loadInspections();
      }, []);
    return(
        <SafeAreaView
              style={{ flex: 1, backgroundColor: "black" }}
              edges={["bottom", "top"]}
            >
        <View style={styles.inspectionDetailContainer}>
            <Text>
                detalles
            </Text>
        </View>
        </SafeAreaView>
    )
}

export default InspectionDetail