import InspectionRepository from "@/database/repositories/InspectionRepository";
import { Inspection } from "@/database/schema/InspectionTable";
import { useEffect, useState } from "react";
import { Text,  View,  TouchableOpacity,  ScrollView, Alert, ActivityIndicator,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import styles from '../../styles/inspection-styles'
import { router } from "expo-router";
import ModalToDeleteItems from "@/components/ModalToDeleteItems";
import { formatDate } from "@/utils/dateFormat";
import ModalToShowInformation from "@/components/ModalToShowInformation";

const UncompletedInspectionsList = () => {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInspection, setSelectedInspection] =useState<Inspection | null>(null);
  const [showInfoModal,setShowInfoModal]=useState<boolean>(false)
  const [selectedInfo,setSelectedInfo]=useState<{title:string,about:string}>({title:"",about:""})
  const [fileLoader,setFileLoader]=useState<boolean>(false)
  useEffect(() => {
    const loadInspections = async () => {
      try {
        const result = await InspectionRepository.findAll();
        const completedInspections = result.filter(inspection => inspection.status !== "completed")
      setInspections(completedInspections)
      } catch (error) {
        console.error("Error cargando inspecciones:", error);
      }
    };

    loadInspections();
  }, []);

  const getValue = (value?: string) => {
    return value?.trim() ? value : "Sin completar";
  };
const handleOpenDeleteModal = (inspection: Inspection) => {
  setSelectedInspection(inspection);
  setShowDeleteModal(true);
};
const handleDeleteInspection = async () => {
  if (!selectedInspection) return;
  try {
    await InspectionRepository.delete(
      selectedInspection.id
    );

    setInspections((prev) =>
      prev.filter(
        (item) => item.id !== selectedInspection.id
      )
    );

    setShowDeleteModal(false);
    setSelectedInspection(null);

    console.log(
      "🗑️ Inspección eliminada:",
      selectedInspection.id
    );
  } catch (error) {
    console.error(
      "Error eliminando inspección:",
      error
    );
  }
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
          >Sin Completar</Text>    
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
                Las inspecciones sin completar aparecerán aquí.
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
                    {formatDate(inspection.createdAt,"date")}
                    {"  "}
                    {formatDate(inspection.createdAt,"time")}
                  </Text>
                </View>

                <View
                  style={styles.dataInspectionCardContainerBtns}
                >
                 
                  <View
                style={styles.headerViewContainerCardIcon}
              >
                <FontAwesome6
                    name="file-circle-xmark"
                    size={20}
                    color="#F40F02"
                    iconStyle="solid"
                    />
              </View>
                             
                <TouchableOpacity
                onPress={()=>
                   router.push({
                      pathname: "/uncompleted/[id]/uncompletedDetails",
                      params: {
                        id: inspection.id,
                      }})
                }
                style={styles.headerViewContainerCardIcon}
              >
                <FontAwesome6
                    name="eye"
                    size={20}
                    color="#2563EB"
                    iconStyle="solid"
                    />
                  </TouchableOpacity>
                   <TouchableOpacity
                    onPress={()=>{
                                  router.push({
                                  pathname: "/inspection/edit",
                                  params: {
                                    inspectionId: inspection.id,
                                  },
                                })
                   }}
                style={styles.headerViewContainerCardIcon}
              >
                <FontAwesome6
                    name="pen-clip"
                    size={20}
                    color="#2563EB"
                    iconStyle="solid"
                    />
                  </TouchableOpacity>
                   <TouchableOpacity
                   onPress={() => handleOpenDeleteModal(inspection)}
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
        <ModalToDeleteItems
          visible={showDeleteModal}
          inspection={selectedInspection}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedInspection(null);
          }}
          onConfirm={handleDeleteInspection}
        />
        <ModalToShowInformation 
          visible={showInfoModal}
          about={selectedInfo.about}
          title={selectedInfo.title}
          onCancel={()=>setShowInfoModal(false)}
        />
              </View>
    </SafeAreaView>
  );
};



export default UncompletedInspectionsList;

