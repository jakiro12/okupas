export interface Theme {
  background: string;
  surface: string;
  primary: string;
  primaryStrong: string;
  primarySoft: string;
  secondary: string;

  success: string;

  text: string;
  textSecondary: string;
  textMuted: string;

  border: string;
  divider: string;
}

export const colors: Record<"light" | "dark", Theme> = {
  light: {
    background: "#eaf4fb",
    surface: "#ffffff",
    primary: "#0c6efd",
    primaryStrong: "#0057fd",
    primarySoft: "#96c4fd",
    secondary: "#5097fc",

    success: "#44c66f",

    text: "#091431",
    textSecondary: "#515b73",
    textMuted: "#888fa0",

    border: "#96c4fd",
    divider: "#eaf4fb",
  },

  dark: {
    background: "#091431",
    surface: "#162448",
    primary: "#0c6efd",
    primaryStrong: "#0057fd",
    primarySoft: "#96c4fd",
    secondary: "#5097fc",

    success: "#44c66f",

    text: "#eaf4fb",
    textSecondary: "#96c4fd",
    textMuted: "#888fa0",

    border: "#515b73",
    divider: "#515b73",
  },
};

export type ThemeMode = "light" | "dark" | "system";