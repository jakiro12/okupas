import FileSystemService from "@/services/fyilesystem/FileSystemService";
import { Stack } from "expo-router";
import { useEffect } from "react";
import SQLiteService  from '../database/sqlite'

export default function RootLayout() {
 useEffect(() => {
  const init = async () => {
    try {
      await Promise.all([
        SQLiteService.initialize(),
        FileSystemService.initialize(),
      ]);

      console.log("✅ Aplicación inicializada");
    } catch (error) {
      console.error(error);
    }
  };

  init();
}, []);
  return ( <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />    
              <Stack.Screen name="inspection/inspection" />   
              <Stack.Screen name="inspection/[inspectionId]/photos" />  
              <Stack.Screen name="list/inspectionsList" />    
          </Stack>
          )
      }
