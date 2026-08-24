import { StyleSheet,ImageStyle,ViewStyle,TextStyle} from "react-native";

interface FilesTypesStyles{
  container:ViewStyle
  headerFilesListContainer:ViewStyle
  arrowBackView:ViewStyle
  mainTitle:TextStyle
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
    headerFilesListContainer:{
    width:'95%',
    height:'10%',
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    flexDirection:'row',
    columnGap:10
  },
  arrowBackView:{
    width:40,
    height:40,
    backgroundColor:'#5098fc31',
    borderRadius:5,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  mainTitle:{
    width:'auto',
    height:'auto',
    fontSize:22,
    fontWeight:'bold',
    color:'#091431'
  },
})

export default FilesStyles