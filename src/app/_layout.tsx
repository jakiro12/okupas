import FileSystemService from "@/services/fyilesystem/FileSystemService";
import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import SQLiteService  from '../database/sqlite'
import { ThemeProvider } from "@/theme/ThemeProvider";
import { ImageQuality } from "@/services/image/ImageProcessor";
import { ImageEditorSettingsProvider } from "@/settings/ImageEditorSettingsContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
//para borrar y resetar todo en caso de agregar algo
//import * as SQLite from "expo-sqlite";
//await SQLite.deleteDatabaseAsync("okupas.db"),
type DataContextType = {
  initialized:boolean,
  quality: ImageQuality;
  setQuality: (quality: ImageQuality) => void;
};

export const DataContext = createContext<DataContextType | undefined>(undefined);

export default function RootLayout() {
  const [initialized,setInitialized]=useState<boolean>(false)
  const [quality, setQuality] =useState<ImageQuality>("Media");
 useEffect(() => {
    
  const init = async () => {
    try {
      await Promise.all([
        SQLiteService.initialize(),
        FileSystemService.initialize(),
      ]);
      setInitialized(true)
    } catch (error) {
      console.error(error);
    }
  };

  init();
}, []);
  return ( 
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ImageEditorSettingsProvider>
    <ThemeProvider>
    <DataContext.Provider value={{initialized,quality, setQuality}}>
        <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />    
              <Stack.Screen name="inspection/inspection" />   
              <Stack.Screen name="inspection/[inspectionId]/photos" />  
              <Stack.Screen name="list/[id]/inspectionDetail" />    
              <Stack.Screen name="files/files"/>
              <Stack.Screen name="settings/settings"/>
              <Stack.Screen name="uncompleted/[id]/uncompletedDetails"/>
          </Stack>
          </DataContext.Provider> 
      </ThemeProvider>
      </ImageEditorSettingsProvider>
      </GestureHandlerRootView>
          )
      }
