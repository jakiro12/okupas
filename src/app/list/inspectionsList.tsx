import InspectionRepository from "@/database/repositories/InspectionRepository";
import { Inspection } from "@/database/schema/InspectionTable";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import styles from '../../styles/inspection-styles'
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

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "black" }}
      edges={["bottom", "top"]}
    >
      <View 
        style={styles.inspectionScreenContainer}
      >
          <Text 
            style={styles.mainTitle}
          >Inspecciones</Text>    
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
                <View >
                  <Text 
                    style={styles.inspectionName}
                  >
                    {getValue(inspection.name)}
                  </Text>

                  <View >
                    <Text >
                      Realizada por
                    </Text>

                    <Text >
                      {getValue(inspection.createdBy)}
                    </Text>
                  </View>

                  <View >
                    <Text >
                      Dirección
                    </Text>

                    <Text >
                      {getValue(inspection.address)}
                    </Text>
                  </View>

                  <View >
                    <Text >
                      Ciudad
                    </Text>

                    <Text >
                      {getValue(inspection.city)}
                    </Text>
                  </View>

                  <View >
                    <Text >
                      Provincia
                    </Text>

                    <Text >
                      {getValue(inspection.province)}
                    </Text>
                  </View>

                  <View >
                    <Text >
                      Observaciones
                    </Text>

                    <Text >
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

                <View >
              

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

