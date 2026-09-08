import { Theme } from "@/theme/theme";
import { StyleSheet,ImageStyle,ViewStyle,TextStyle} from "react-native";

interface NavigationBarStyles{
  container:ViewStyle
  btnContainer:ViewStyle
  btnText:TextStyle
}

const NavBarStyles =(theme:Theme): NavigationBarStyles => StyleSheet.create({
   container: {
    display:'flex',
    width:'100%',
    height:80,
    borderTopWidth:1,
    borderTopColor:theme.backgroundColorHeaderBorder,
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
      color:theme.iconColor,
      fontSize:12
    }
})

export default NavBarStyles