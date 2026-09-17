export interface Theme {
  background: string;
  primary: string;
  primaryStrong: string;
  secondary: string;
  backgroundIcon:string
  success: string;
  text: string;
  border: string;
  iconColor:string
  backgroundColorHeader:string
  backgroundColorHeaderBorder:string
  bgModal:string
}

export const colors: Record<"light" | "dark", Theme> = {
  light: {
    background: "#F8FAFC",
    primary: "#2563EB",
    primaryStrong: "#0057fd",
    secondary: "#5097fc",
    backgroundIcon:"#5098fc31",
    iconColor:"#2563EB",
    success: "#44c66f",
    text: "#091431",
    border: "#96c4fd",
    backgroundColorHeader: "#f1f8fe",
    backgroundColorHeaderBorder: "#96c4fd",
    bgModal:"#e0e3e9"
  },

  dark: {
    background: "#091431",
    primary: "#0c6efd",
    primaryStrong: "#0057fd",
    secondary: "#5097fc",
    backgroundIcon:"#5098fc31",
    success: "#44c66f",
    iconColor:"#eaf4fb",
    text: "#eaf4fb",
    border: "#515b73",
    backgroundColorHeader: "#162448",
    backgroundColorHeaderBorder: "#515b73",
    bgModal:"#151a24"
  },
};

export type ThemeMode = "light" | "dark" | "system";