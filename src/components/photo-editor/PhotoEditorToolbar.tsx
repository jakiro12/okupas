import { Pressable, StyleSheet, Text, View } from "react-native";

interface PhotoEditorToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  onCancel: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onSave: () => void;
}

export default function PhotoEditorToolbar({
  canUndo,
  canRedo,
  onCancel,
  onUndo,
  onRedo,
  onClear,
  onSave,
}: PhotoEditorToolbarProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onCancel} style={styles.button}>
        <Text style={styles.text}>✕</Text>
      </Pressable>

      <Pressable
        onPress={onUndo}
        disabled={!canUndo}
        style={[styles.button, !canUndo && styles.disabled]}
      >
        <Text style={styles.text}>↶</Text>
      </Pressable>

      <Pressable
        onPress={onRedo}
        disabled={!canRedo}
        style={[styles.button, !canRedo && styles.disabled]}
      >
        <Text style={styles.text}>↷</Text>
      </Pressable>

      <Pressable onPress={onClear} style={styles.button}>
        <Text style={styles.text}>🗑</Text>
      </Pressable>

      <Pressable onPress={onSave} style={[styles.button, styles.saveButton]}>
        <Text style={styles.text}>✓</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 16,
    left: 12,
    right: 12,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderRadius: 18,
    backgroundColor: "rgba(9, 20, 49, 0.92)",
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  saveButton: {
    backgroundColor: "#0c6efd",
  },
  disabled: {
    opacity: 0.3,
  },
  text: {
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "600",
  },
});