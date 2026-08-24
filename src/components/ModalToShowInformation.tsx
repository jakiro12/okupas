import { Modal, Text, TouchableOpacity, View } from "react-native"

interface ModalDeleteProps{
  visible: boolean;
  about: string | undefined;
  onCancel: () => void;
  title:string;
}

const ModalToShowInformation=({about,visible,onCancel,title}:ModalDeleteProps)=>{
    

   
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
            backgroundColor: "#e0e3e9",
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
            }}
          >
           {title}
          </Text>

          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              width:'95%'
            }}
          >
            {about}
          </Text>
            <TouchableOpacity
            activeOpacity={0.8}
              onPress={onCancel}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: "#0057fd",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                }}
              >
                Cerrar
              </Text>
            </TouchableOpacity>
          
        </View>
        </View>
        </Modal>
    )
}

export default ModalToShowInformation