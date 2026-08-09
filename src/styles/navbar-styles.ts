import { StyleSheet,ImageStyle,ViewStyle,TextStyle} from "react-native";

interface NavigationBarStyles{
  container:ViewStyle
  btnContainer:ViewStyle
  btnText:TextStyle
}

const NavBarStyles : NavigationBarStyles = StyleSheet.create({
   container: {
    display:'flex',
    width:'100%',
    height:80,
    borderTopWidth:1,
    borderTopColor:'#888fa0',
    justifyContent:'space-around',
    alignItems:'center',
    flexDirection:'row'
    },
    btnContainer:{
      width:'22%',
      height:70,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column', 
    },
    btnText:{
      color:'#2563EB',
      fontSize:12
    }
})

export default NavBarStyles