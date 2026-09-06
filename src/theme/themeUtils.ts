import { Appearance } from "react-native";
import { colors, Theme, ThemeMode } from "./theme";

export const getTheme = (mode: ThemeMode): Theme => {
  if (mode === "system") {
    return Appearance.getColorScheme() === "dark"
      ? colors.dark
      : colors.light;
  }

  return colors[mode];
};