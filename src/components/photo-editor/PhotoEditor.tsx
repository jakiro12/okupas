import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Crypto from "expo-crypto";

import {
  Canvas,
  Image as SkiaImage,
  Path,
  useImage,
  Skia,
  SkPath,
  useCanvasRef,
} from "@shopify/react-native-skia";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { File } from "expo-file-system";
import type { BrushStroke } from "@/types/photo-editor";
import PhotoEditorToolbar from "./PhotoEditorToolbar";

interface PhotoEditorProps {
  imageUri: string;
  onCancel: () => void;
  onSave: (editedImageUri: string) => void;
}

export default function PhotoEditor({
  imageUri,
  onCancel,
  onSave,
}: PhotoEditorProps) {
  const insets = useSafeAreaInsets();
  const image = useImage(imageUri);
  const canvasRef = useCanvasRef();

  const [strokes, setStrokes] = useState<BrushStroke[]>([]);
  const [redoStrokes, setRedoStrokes] = useState<BrushStroke[]>([]);
  const [currentPath, setCurrentPath] = useState<SkPath | null>(null);

  // Espacio máximo disponible en la pantalla
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const activePathRef = useRef<SkPath | null>(null);
  const pathBuilder = useSharedValue(Skia.PathBuilder.Make());

  useEffect(() => {
    setStrokes([]);
    setRedoStrokes([]);
    setCurrentPath(null);
  }, [imageUri]);

  const onContainerLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setContainerSize({ width, height });
    }
  };

  // Cálculo del tamaño EXACTO del Canvas según la relación de aspecto de la foto
  const getCanvasDimensions = () => {
    if (!image || containerSize.width === 0 || containerSize.height === 0) {
      return { width: 0, height: 0 };
    }

    const imgWidth = image.width();
    const imgHeight = image.height();
    const imageAspectRatio = imgWidth / imgHeight;
    const containerAspectRatio = containerSize.width / containerSize.height;

    let width = containerSize.width;
    let height = containerSize.height;

    if (imageAspectRatio > containerAspectRatio) {
      // La imagen es más ancha: ajustamos la altura proporcionalmente
      height = containerSize.width / imageAspectRatio;
    } else {
      // La imagen es más alta: ajustamos el ancho proporcionalmente
      width = containerSize.height * imageAspectRatio;
    }

    return { width, height };
  };

  const canvasBounds = getCanvasDimensions();

  const finishStroke = () => {
    const pathToSave = activePathRef.current;
    if (!pathToSave) return;

    const stroke: BrushStroke = {
      id: Crypto.randomUUID(),
      path: pathToSave,
      color: "#ff0000",
      strokeWidth: 6,
      opacity: 1,
    };

    setStrokes((previous) => [...previous, stroke]);
    setRedoStrokes([]);
    setCurrentPath(null);
    activePathRef.current = null;
  };

  const updatePathOnJS = (newPath: SkPath) => {
    activePathRef.current = newPath;
    setCurrentPath(newPath);
  };

  const drawGesture = Gesture.Pan()
    .onStart((event) => {
      "worklet";
      pathBuilder.value.reset();
      pathBuilder.value.moveTo(event.x, event.y);

      const path = pathBuilder.value.build();
      scheduleOnRN(updatePathOnJS, path);
    })
    .onChange((event) => {
      "worklet";
      pathBuilder.value.lineTo(event.x, event.y);

      const nextPath = pathBuilder.value.build();
      scheduleOnRN(updatePathOnJS, nextPath);
    })
    .onEnd(() => {
      "worklet";
      scheduleOnRN(finishStroke);
    });

  const handleUndo = () => {
    if (strokes.length === 0) return;
    const lastStroke = strokes[strokes.length - 1];
    setStrokes((previous) => previous.slice(0, -1));
    setRedoStrokes((previous) => [...previous, lastStroke]);
  };

  const handleRedo = () => {
    if (redoStrokes.length === 0) return;
    const lastRedoStroke = redoStrokes[redoStrokes.length - 1];
    setRedoStrokes((previous) => previous.slice(0, -1));
    setStrokes((previous) => [...previous, lastRedoStroke]);
  };

  const handleClear = () => {
    setStrokes([]);
    setRedoStrokes([]);
    setCurrentPath(null);
    activePathRef.current = null;
  };

  const handleSave = async () => {
    try {
      const snapshot = canvasRef.current?.makeImageSnapshot();
      if (!snapshot) return;

      const base64 = snapshot.encodeToBase64();
      if (!base64) return;

      const targetFile = new File(imageUri);
      await targetFile.create({ intermediates: true, overwrite: true });
      await targetFile.write(base64, { encoding: "base64" });

      onSave(targetFile.uri);
    } catch (error) {
      console.error("Error al guardar la imagen editada:", error);
    }
  };

  if (!image) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.toolbarContainer, { paddingTop: insets.top + 8 }]}>
        <PhotoEditorToolbar
          canUndo={strokes.length > 0}
          canRedo={redoStrokes.length > 0}
          onCancel={onCancel}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onClear={handleClear}
          onSave={handleSave}
        />
      </View>

      <View style={styles.canvasContainer} onLayout={onContainerLayout}>
        {canvasBounds.width > 0 && canvasBounds.height > 0 && (
          <GestureDetector gesture={drawGesture}>
            <View
              style={{
                width: canvasBounds.width,
                height: canvasBounds.height,
              }}
            >
              <Canvas ref={canvasRef} style={styles.canvas}>
                <SkiaImage
                  image={image}
                  x={0}
                  y={0}
                  width={canvasBounds.width}
                  height={canvasBounds.height}
                  fit="fill"
                />

                {strokes.map((stroke) => (
                  <Path
                    key={stroke.id}
                    path={stroke.path}
                    color={stroke.color}
                    style="stroke"
                    strokeWidth={stroke.strokeWidth}
                    strokeCap="round"
                    strokeJoin="round"
                    opacity={stroke.opacity}
                  />
                ))}

                {currentPath && (
                  <Path
                    path={currentPath}
                    color="#ff0000"
                    style="stroke"
                    strokeWidth={6}
                    strokeCap="round"
                    strokeJoin="round"
                  />
                )}
              </Canvas>
            </View>
          </GestureDetector>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  toolbarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingHorizontal: 12,
  },
  canvasContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    width: "100%",
    height: "100%",
  },
});