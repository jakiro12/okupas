import { Theme } from "@/theme/theme";
import { StyleSheet,ImageStyle,ViewStyle,TextStyle} from "react-native";

interface PhotoScreenStyles{
  container:ViewStyle
  previewContainer:ViewStyle
  emptyText:TextStyle
  image:ImageStyle
  buttonContainer:ViewStyle
  button:ViewStyle
  buttonText:TextStyle
  cardPhotoData:ViewStyle
  buttonActions:ViewStyle
  cardPhotoContainer:ViewStyle
}

const PhotoScreenStyles=(theme:Theme) : PhotoScreenStyles => StyleSheet.create({
  container: {
    height:'100%',
    width:'100%',
    backgroundColor: theme.background,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    paddingTop:10,
    paddingBottom:10
  },
  previewContainer: {
    height: '40%',
    width:'90%',
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.border,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  emptyText: {
    color: "#64748B",
    fontSize: 16,
  },

  buttonContainer: {
    marginBottom: 8,
    display:'flex',
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },

  button: {
    backgroundColor: theme.primary,
    borderRadius: 16,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    width:'90%'
  },
  cardPhotoContainer:{
    width:'90%',
    height:'auto',
    marginBottom:8
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  cardPhotoData:{
    width:'100%',
    height:100,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#5098fc31',
    borderRadius:10,
    flexDirection:'row',
    paddingInline:20,
    marginBottom:10
  },
   buttonActions: {
    backgroundColor: theme.primary,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width:46,
    height:46
  },
});
export default PhotoScreenStyles