import InspectionRepository from "@/database/repositories/InspectionRepository";
import { Inspection } from "@/database/schema/InspectionTable";
import { useEffect, useState } from "react";
import { Text,  View,  TouchableOpacity,  ScrollView, Alert,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import styles from '../../styles/inspection-styles'
import { router } from "expo-router";
const InspectionsList = () => {
  const [inspections, setInspections] = useState<Inspection[]>([]);

  useEffect(() => {
    const loadInspections = async () => {
      try {
        const result = await InspectionRepository.findAll();

        setInspections(result);

        console.log("📋 Inspecciones:", result);
      } catch (error) {
        console.error("Error cargando inspecciones:", error);
      }
    };

    loadInspections();
  }, []);

  const getValue = (value?: string) => {
    return value?.trim() ? value : "No especificado";
  };
const handleDeleteInspection = (inspection: Inspection) => {
  Alert.alert(
    "Eliminar inspección",
    `¿Quieres eliminar "${inspection.name}"?`,
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await InspectionRepository.delete(inspection.id);

            setInspections((prev) =>
              prev.filter((item) => item.id !== inspection.id)
            );

            console.log(
              "🗑️ Inspección eliminada:",
              inspection.id
            );
          } catch (error) {
            console.error(
              "Error eliminando inspección:",
              error
            );

            Alert.alert(
              "Error",
              "No se pudo eliminar la inspección."
            );
          }
        },
      },
    ]
  );
};
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "black" }}
      edges={["bottom", "top"]}
    >
      <View 
        style={styles.inspectionScreenContainer}
      >
        <View
          style={styles.headerInspectionsListContainer}
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
          >Inspecciones Realizadas</Text>    
        </View>
        <ScrollView
          contentContainerStyle={styles.inspectionContainer}
          style={{width:'100%'}}
          showsVerticalScrollIndicator={false}
        >
          {inspections.length === 0 ? (
            <View >
              <Text >
                No hay inspecciones
              </Text>

              <Text >
                Las inspecciones que crees aparecerán aquí.
              </Text>
            </View>
          ) : (
            inspections.map((inspection) => (
              <View
                key={inspection.id}
                style={styles.inspectionCard}
              >
                <View 
                  style={styles.dataInspectionCardContainer}
                >
                  <Text 
                    style={styles.inspectionName}
                  >
                    {getValue(inspection.name)}
                  </Text>

                  <View >
                    <Text style={styles.labelInspectionData}>
                      Realizada por
                    </Text>

                    <Text 
                      style={styles.valueInspectionData}
                    >
                      {getValue(inspection.createdBy)}
                    </Text>
                  </View>

                  <View >
                    <Text style={styles.labelInspectionData}>
                      Dirección
                    </Text>

                    <Text 
                    style={styles.valueInspectionData}
                    >
                      {getValue(inspection.address)}
                    </Text>
                  </View>

                  <View >
                    <Text style={styles.labelInspectionData}>
                      Ciudad
                    </Text>

                    <Text 
                    style={styles.valueInspectionData}
                    >
                      {getValue(inspection.city)}
                    </Text>
                  </View>

                  <View >
                    <Text style={styles.labelInspectionData}>
                      Provincia
                    </Text>

                    <Text 
                    style={styles.valueInspectionData}
                    >
                      {getValue(inspection.province)}
                    </Text>
                  </View>

                  <View >
                    <Text style={styles.labelInspectionData}>
                      Observaciones
                    </Text>

                    <Text 
                    style={styles.valueInspectionData}
                    >
                      {inspection.observations?.trim()
                        ? inspection.observations
                        : "Sin observaciones"}
                    </Text>
                  </View>

                  <Text 
                    style={styles.inspectionDate}
                  >
                    {inspection.createdAt}
                  </Text>
                </View>

                <View
                  style={styles.dataInspectionCardContainerBtns}
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
                <View
                style={styles.headerViewContainerCardIcon}
              >
                <FontAwesome6
                    name="eye"
                    size={20}
                    color="#2563EB"
                    iconStyle="solid"
                    />
                  </View>
                   <View
                style={styles.headerViewContainerCardIcon}
              >
                <FontAwesome6
                    name="pen-clip"
                    size={20}
                    color="#2563EB"
                    iconStyle="solid"
                    />
                  </View>
                   <TouchableOpacity
                   onPress={()=>handleDeleteInspection(inspection)}
                style={styles.headerViewContainerCardIcon}
              >
                <FontAwesome6
                    name="trash-can"
                    size={20}
                    color="#2563EB"
                    iconStyle="solid"
                    />
              </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};



export default InspectionsList;

