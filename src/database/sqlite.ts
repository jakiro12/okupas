import * as SQLite from "expo-sqlite";
import { runMigrations } from "./migration";

class SQLiteService {
  private db: SQLite.SQLiteDatabase | null = null;

  async initialize(): Promise<void> {
    if (this.db) return;
    // Borrar db cada vez que un campo no exista o se agregue uno nuevo
    //await SQLite.deleteDatabaseAsync("okupas.db");
    this.db = await SQLite.openDatabaseAsync("okupas.db");

    await runMigrations(this.db);

    console.log("✅ SQLite inicializada");
  }

  getDatabase(): SQLite.SQLiteDatabase {
    if (!this.db) {
      throw new Error("SQLite no fue inicializada.");
    }

    return this.db;
  }
}

export default new SQLiteService();