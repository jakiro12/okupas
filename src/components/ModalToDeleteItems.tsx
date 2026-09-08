import { Inspection } from "@/database/schema/InspectionTable";
import { useTheme } from "@/theme/ThemeProvider";
import { Modal, Text, TouchableOpacity, View } from "react-native"

interface ModalDeleteProps{
  visible: boolean;
  inspection: Inspection | null;
  onCancel: () => void;
  onConfirm: () => void;
}

const ModalToDeleteItems=({inspection,visible,onCancel,onConfirm}:ModalDeleteProps)=>{
    if (!inspection) return null;

          const { theme } = useTheme()
   
    return(
        <Modal 
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onCancel}
        >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: '90%',
            height: 180,
            backgroundColor: theme.bgModal,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            rowGap: 15,
          }}
        >
    <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginBottom: 10,
              color:theme.text
            }}
          >
            Eliminar inspección
          </Text>

          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              marginBottom: 24,
              width:'95%',
              color:theme.text
            }}
          >
            ¿Quieres eliminar la inspeccion "{inspection.name ? inspection.name : "Sin completar"}"?
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 12,
            }}
          >
            <TouchableOpacity
              onPress={onCancel}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: theme.primary,
              }}
            >
              <Text
                style={{color:'#ffffff'}}
              >Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: theme.primary,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                }}
              >
                Eliminar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        </Modal>
    )
}

export default ModalToDeleteItems