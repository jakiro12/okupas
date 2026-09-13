import type { SkPath } from "@shopify/react-native-skia";

export interface BrushStroke {
  id: string;
  path: SkPath;
  color: string;
  strokeWidth: number;
  opacity: number;
}