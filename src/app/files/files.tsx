import InspectionRepository from "@/database/repositories/InspectionRepository";
import { Inspection } from "@/database/schema/InspectionTable";
import PdfService from "@/services/pdf/PdfService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import styles from '../../styles/files-styles'
import { formatDate } from "@/utils/dateFormat";

const FilesList=()=>{
    const [files, setFiles] =useState<Inspection[]>([]);
      const loadPdfs = async () => {
    try {
      const result =
        await InspectionRepository.findAll();

      const inspectionsWithPdf: Inspection[] = [];
        console.log(result)
      for (const inspection of result) {
        const pdf =
          await PdfService.getInspectionPdf(
            inspection.id
          );
          console.log(pdf)
        if (pdf) {
          inspectionsWithPdf.push(inspection);
        }
      }

      setFiles(inspectionsWithPdf);
    } catch (error) {
      console.error(
        "Error cargando PDFs:",
        error
      );
    }
  };
    useEffect(()=>{
        loadPdfs()
    },[])
    const handleDeletePdf = async (
  inspectionId: string
) => {

  try {

    const deleted =
      await PdfService.deleteInspectionPdf(
        inspectionId
      );

    if (!deleted) {
      Alert.alert(
        "PDF no encontrado",
        "El archivo ya no existe."
      );
      return;
    }

    Alert.alert(
      "PDF eliminado",
      "El PDF fue eliminado correctamente."
    );

    loadPdfs();

  } catch (error) {

    console.error(
      "Error eliminando PDF:",
      error
    );

    Alert.alert(
      "Error",
      "No se pudo eliminar el PDF."
    );
  }
};
    return(
        <SafeAreaView
                      style={{ flex: 1, backgroundColor: "black" }}
                      edges={["bottom", "top"]}
                    >
        <View style={styles.container}>
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
                PDF generados
            </Text>
            </View>

            <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width:'100%',height:'auto',paddingTop:10}}
            contentContainerStyle={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}
            >
            {files.length === 0 ? (
                <View
                style={{
                    backgroundColor: "white",
                    width:'95%',
                    borderRadius: 18,
                    alignItems: "center",
                }}
                >
                <Text
                    style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#334155",
                    }}
                >
                    No hay PDFs generados
                </Text>

                <Text
                    style={{
                    marginTop: 8,
                    color: "#64748b",
                    textAlign: "center",
                    }}
                >
                    Los PDFs que generes aparecerán aquí.
                </Text>
                </View>
            ) : (
                files.map((inspection) => (
                <View
                    key={inspection.id}
                    style={{
                    backgroundColor: "white",
                    width:'95%',
                    borderRadius: 18,
                    padding: 18,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: "#d6e4f5",
                    }}
                >
                    <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: "#1e293b",
                    }}
                    >
                    {inspection.name}
                    </Text>

                    <Text
                    style={{
                        marginTop: 6,
                        color: "#64748b",
                    }}
                    >
                      {formatDate(inspection.createdAt,"date")}
                    </Text>

                    <View
                    style={{
                        flexDirection: "row",
                        marginTop: 15,
                        gap: 10,
                    }}
                    >
                    <TouchableOpacity
                        style={{
                        flex: 1,
                        backgroundColor: "#2563EB",
                        padding: 12,
                        borderRadius: 10,
                        alignItems: "center",
                        }}
                        onPress={()=>handleDeletePdf(inspection.id)}
                    >
                        <Text
                        style={{
                            color: "white",
                            fontWeight: "600",
                        }}
                        >
                        Eliminar PDF
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                        flex: 1,
                        backgroundColor: "#e2e8f0",
                        padding: 12,
                        borderRadius: 10,
                        alignItems: "center",
                        }}
                        onPress={() =>
                                    PdfService.openPdf(inspection.id)
                                }
                    >
                        <Text
                        style={{
                            color: "#1e293b",
                            fontWeight: "600",
                        }}
                        >
                        Ver PDF
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>
                ))
            )}
            </ScrollView>

        </View>

        </SafeAreaView>
    )
}
export default FilesList