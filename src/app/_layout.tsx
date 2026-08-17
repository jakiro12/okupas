import FileSystemService from "@/services/fyilesystem/FileSystemService";
import { Stack } from "expo-router";
import { useEffect } from "react";
import SQLiteService  from '../database/sqlite'

//para borrar y resetar todo en caso de agregar algo
//import * as SQLite from "expo-sqlite";
//await SQLite.deleteDatabaseAsync("okupas.db"),
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
              <Stack.Screen name="list/[id]/inspectionDetail" />    
          </Stack>
          )
      }
