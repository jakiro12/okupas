import { StyleSheet,ImageStyle,ViewStyle,TextStyle} from "react-native";

interface PhotoScreenStyles{
  container:ViewStyle
  previewContainer:ViewStyle
  emptyText:TextStyle
  image:ImageStyle
  buttonContainer:ViewStyle
  button:ViewStyle
  buttonText:TextStyle
}

const PhotoScreenStyles : PhotoScreenStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  previewContainer: {
    height: 260,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D6E4F5",
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
    gap: 14,
    marginBottom: 28,
  },

  button: {
    backgroundColor: "#2563EB",
    borderRadius: 16,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
export default PhotoScreenStyles