

import { PROVINCIAS_ARGENTINA } from "@/utils/provinces";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"

interface ModalDeleteProps{
  visible: boolean;
  onCancel: () => void;
  onChangeText: (text: string) => void;
}

const AddProvince=({visible,onCancel,onChangeText}:ModalDeleteProps)=>{
    const provinceList=["1","2"]
    const handlePickProvince=(e:string)=>{
        onChangeText(e)
        onCancel()
    }
   
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
              marginBottom: 5,
            }}
          >
           Elegir provincia
          </Text>
            <ScrollView
                contentContainerStyle={{width:'100%'}}
                style={{width:'100%',height:'auto',borderTopColor:'#091431',borderTopWidth:1}}
            >
                {PROVINCIAS_ARGENTINA.map((e,i)=>
                <TouchableOpacity
                    style={{width:'100%',height:45,borderBottomColor:'#96c4fd',borderBottomWidth:1,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}
                    key={i}
                    onPress={()=>handlePickProvince(e)}
                >
                    <Text>{e}</Text>
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
                backgroundColor: "#0057fd",
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