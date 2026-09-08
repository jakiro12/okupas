import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

import { colors, Theme, ThemeMode } from "./theme";

interface ThemeContextValue {
  mode: ThemeMode;
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const systemScheme = useColorScheme();

  const [mode, setMode] = useState<ThemeMode>("light");

  const theme = useMemo(() => {
    if (mode === "system") {
      return systemScheme === "dark"
        ? colors.dark
        : colors.light;
    }

    return colors[mode];
  }, [mode, systemScheme]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};