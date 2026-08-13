import { StyleSheet,ImageStyle,ViewStyle,TextStyle} from "react-native";

interface InspectionScreen{
  container:ViewStyle
  headerViewContainer:ViewStyle
  arrowBackView:ViewStyle
  headerViewContainerLegend:ViewStyle
  headerViewContainerLegendTitle:TextStyle
  headerViewContainerLegendDesc:TextStyle
  mainContainerView:ViewStyle
  inputboxContainer:ViewStyle
  inputboxContainerView:ViewStyle
  inputboxContainerViewLogo:ViewStyle
  inputboxContainerViewDesc:TextStyle
  inputboxContainerViewTitle:TextStyle
  getPhotosBtn:ViewStyle
  headerViewContainerCardIcon:ViewStyle
  inspectionCard:ViewStyle
  inspectionContainer:ViewStyle
  inspectionScreenContainer:ViewStyle
  mainTitle:TextStyle
  inspectionDate:TextStyle
  inspectionName:TextStyle
  labelInspectionData:TextStyle
  dataInspectionCardContainer:ViewStyle
  dataInspectionCardContainerBtns:ViewStyle
  valueInspectionData:TextStyle
  headerInspectionsListContainer:ViewStyle
}

const InspectionStyles : InspectionScreen = StyleSheet.create({
   container: {
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent: "space-between",
    alignItems:'center',
    flexDirection:'column',
    backgroundColor:'#F8FAFC'
  },
  headerViewContainer:{
    width:'95%',
    height:80,   
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
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
  headerViewContainerLegend:{
    width:'82%',
    height:'auto',
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'center',
  },
  headerViewContainerLegendTitle:{
    width:'auto',
    height:'auto',
    fontSize:20,
    fontWeight:'bold',
    color:'#091431'
  },
  headerViewContainerLegendDesc:{
    width:'auto',
    height:'auto',
    fontSize:12,
    fontWeight:'bold',
    color:'#888fa0'
  },
  mainContainerView:{
    width:'95%',
    height:'75%',
    borderWidth:1,
    borderColor:'#888fa04d',
    display:'flex',
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'column',
    rowGap:10,
    padding:8,
    borderRadius:4
  },
  inputboxContainer:{
    width:'100%',
    height:65,
    display:'flex',
    alignItems:'flex-start',
    justifyContent:'space-between',
    flexDirection:'column',
  },
  inputboxContainerView:{
    width:'100%',
    height:48,
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
  },
  inputboxContainerViewLogo:{
    width:35,
    height:35,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#5098fc31',
    borderRadius:4
  },
  inputboxContainerViewDesc:{
    width:'84%',
    height:38,
    borderColor:'#515b73',
    borderWidth:1,
    borderRadius:4,
      fontWeight:'bold',
    color:'#091431'
  },
  inputboxContainerViewTitle:{
    width:'auto',
    height:'auto',
    fontSize:14,
    fontWeight:'bold',
    color:'#2563EB'
  },
  getPhotosBtn:{
    backgroundColor:'#2563EB',
    width:'100%',
    height:40,
    borderRadius:4,
    marginTop:'auto',
     display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    columnGap:10
  },
  inspectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D6E4F5",
    padding: 16,
    flexDirection: "row",
    width:'95%',
    height:300
  },
  headerViewContainerCardIcon:{
    width:40,
    height:40,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#5098fc31',
    borderRadius:5
  },
  inspectionContainer:{
    width:'100%',
    height:'auto',
    backgroundColor:'#F8FAFC',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    rowGap:16
  },
  inspectionScreenContainer:{
    width:'100%',
    height:'100%',
    backgroundColor:'#F8FAFC',
     display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center'
  },
   mainTitle:{
    width:'auto',
    height:'auto',
    fontSize:24,
    fontWeight:'bold',
    color:'#091431'
  },
  inspectionDate: { 
    fontSize: 12, 
    color: "#888fa0"
   },
   inspectionName: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#091431"
  },
  labelInspectionData: { 
    fontSize: 12, 
    fontWeight: "600", 
    color: "#091431", 
    marginBottom: 2, 
  },
  dataInspectionCardContainer:{
    width:'80%',
    height:'100%',
  },
  dataInspectionCardContainerBtns:{
    width:'20%',
    height:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    rowGap:18
  },
  valueInspectionData:{
    color: "#091431",
    fontSize:14
  },
  headerInspectionsListContainer:{
    width:'95%',
    height:'10%',
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center',
    flexDirection:'row',
    columnGap:10
  }
})

export default InspectionStyles