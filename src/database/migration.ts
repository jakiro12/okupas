import { createInspectionTable } from "./schema/InspectionTable";
import { createPhotoTable } from "./schema/PhotoTable";
import { createReportTable } from "./schema/ReportTable";
import * as SQLite from "expo-sqlite";

export async function runMigrations(db: SQLite.SQLiteDatabase) {
  await db.execAsync(createInspectionTable);
  await db.execAsync(createPhotoTable);
  await db.execAsync(createReportTable);
}