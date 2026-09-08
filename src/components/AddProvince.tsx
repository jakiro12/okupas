

import { useTheme } from "@/theme/ThemeProvider";
import { PROVINCIAS_ARGENTINA } from "@/utils/provinces";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"

interface ModalDeleteProps{
  visible: boolean;
  onCancel: () => void;
  onChangeText: (text: string) => void;
}

const AddProvince=({visible,onCancel,onChangeText}:ModalDeleteProps)=>{
    const handlePickProvince=(e:string)=>{
        onChangeText(e)
        onCancel()
    }
       const { theme } = useTheme()
   
    return(
        <Modal 
        visible={visible}
        transparent
        animationType="fade"
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
            height:'80%',
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
              marginBottom: 5,
              color:theme.text
            }}
          >
           Elegir provincia
          </Text>
            <ScrollView
                contentContainerStyle={{width:'100%'}}
                style={{width:'100%',height:'auto'}}
            >
                {PROVINCIAS_ARGENTINA.map((e,i)=>
                <TouchableOpacity
                    style={{width:'100%',height:45,borderBottomColor:theme.border,borderBottomWidth:1,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}
                    key={i}
                    onPress={()=>handlePickProvince(e)}
                >
                    <Text
                      style={{color:theme.text,fontWeight:'bold'}}
                    >{e}</Text>
                </TouchableOpacity>
                )}
            </ScrollView>
        
          
           <TouchableOpacity
            activeOpacity={0.8}
              onPress={onCancel}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 10,
                backgroundColor: theme.primary,
                marginBottom:5
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

export default AddProvince