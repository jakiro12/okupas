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
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Inspecciones</Text>

        <Text style={styles.subtitle}>
          Inspecciones realizadas
        </Text>

        {inspections.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No hay inspecciones
            </Text>

            <Text style={styles.emptyText}>
              Las inspecciones que crees aparecerán aquí.
            </Text>
          </View>
        ) : (
          inspections.map((inspection) => (
            <View
              key={inspection.id}
              style={styles.card}
            >
              <View style={styles.content}>
                <Text style={styles.inspectionName}>
                  {getValue(inspection.name)}
                </Text>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>
                    Realizada por
                  </Text>

                  <Text style={styles.value}>
                    {getValue(inspection.createdBy)}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>
                    Dirección
                  </Text>

                  <Text style={styles.value}>
                    {getValue(inspection.address)}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>
                    Ciudad
                  </Text>

                  <Text style={styles.value}>
                    {getValue(inspection.city)}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>
                    Provincia
                  </Text>

                  <Text style={styles.value}>
                    {getValue(inspection.province)}
                  </Text>
                </View>

                <View style={styles.observations}>
                  <Text style={styles.label}>
                    Observaciones
                  </Text>

                  <Text style={styles.value}>
                    {inspection.observations?.trim()
                      ? inspection.observations
                      : "Sin observaciones"}
                  </Text>
                </View>

                <Text style={styles.date}>
                  {inspection.createdAt}
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {}}
                >
                  <Text style={styles.actionIcon}>👁️</Text>
                  <Text style={styles.actionText}>
                    Ver
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {}}
                >
                  <Text style={styles.actionIcon}>✏️</Text>
                  <Text style={styles.actionText}>
                    Editar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {}}
                >
                  <Text style={styles.actionIcon}>📄</Text>
                  <Text style={styles.actionText}>
                    PDF
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#172033",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D6E4F5",
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
  },

  content: {
    flex: 1,
    paddingRight: 12,
  },

  inspectionName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#172033",
    marginBottom: 14,
  },

  infoRow: {
    marginBottom: 9,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 2,
  },

  value: {
    fontSize: 14,
    color: "#334155",
  },

  observations: {
    marginTop: 3,
    marginBottom: 12,
  },

  date: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },

  actions: {
    width: 62,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  actionButton: {
    width: 54,
    minHeight: 54,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6E4F5",
  },

  actionIcon: {
    fontSize: 18,
    marginBottom: 2,
  },

  actionText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#2563EB",
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D6E4F5",
    padding: 24,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#172033",
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});

export default InspectionsList;

