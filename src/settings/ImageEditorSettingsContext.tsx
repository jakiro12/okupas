import React, { createContext, useContext, useState } from "react";

interface ImageEditorSettingsContextValue {
  editorEnabled: boolean;
  setEditorEnabled: (enabled: boolean) => void;
}

const ImageEditorSettingsContext =
  createContext<ImageEditorSettingsContextValue | null>(null);

export function ImageEditorSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editorEnabled, setEditorEnabled] = useState(false);

  return (
    <ImageEditorSettingsContext.Provider
      value={{
        editorEnabled,
        setEditorEnabled,
      }}
    >
      {children}
    </ImageEditorSettingsContext.Provider>
  );
}

export function useImageEditorSettings() {
  const context = useContext(ImageEditorSettingsContext);

  if (!context) {
    throw new Error(
      "useImageEditorSettings debe utilizarse dentro de ImageEditorSettingsProvider"
    );
  }

  return context;
}