import { StyleSheet,ImageStyle,ViewStyle,TextStyle} from "react-native";

interface FilesTypesStyles{
  container:ViewStyle
}

const FilesStyles : FilesTypesStyles = StyleSheet.create({
   container: {
    display:'flex',
    width:'100%',
    height:'100%',
    justifyContent:'space-around',
    alignItems:'center',
    flexDirection:'column',
    backgroundColor:'#F8FAFC'
    },
    
})

export default FilesStyles