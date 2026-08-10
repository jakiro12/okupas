import SQLiteService from "../sqlite";
import { REPORT_TABLE, Report } from "../schema/ReportTable";

class ReportRepository {

  async create(report: Report): Promise<void> {
    const db = SQLiteService.getDatabase();

    await db.runAsync(
      `
      INSERT INTO ${REPORT_TABLE} (
        id,
        inspectionId,
        fileName,
        uri,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        report.id,
        report.inspectionId,
        report.fileName,
        report.uri,
        report.createdAt,
      ]
    );
  }

  async findAll(): Promise<Report[]> {
    const db = SQLiteService.getDatabase();

    return await db.getAllAsync<Report>(
      `
      SELECT *
      FROM ${REPORT_TABLE}
      ORDER BY createdAt DESC
      `
    );
  }

  async findByInspectionId(
    inspectionId: string
  ): Promise<Report[]> {
    const db = SQLiteService.getDatabase();

    return await db.getAllAsync<Report>(
      `
      SELECT *
      FROM ${REPORT_TABLE}
      WHERE inspectionId = ?
      ORDER BY createdAt DESC
      `,
      [inspectionId]
    );
  }

  async findById(
    id: string
  ): Promise<Report | null> {
    const db = SQLiteService.getDatabase();

    return await db.getFirstAsync<Report>(
      `
      SELECT *
      FROM ${REPORT_TABLE}
      WHERE id = ?
      `,
      [id]
    );
  }

  async delete(id: string): Promise<void> {
    const db = SQLiteService.getDatabase();

    await db.runAsync(
      `
      DELETE FROM ${REPORT_TABLE}
      WHERE id = ?
      `,
      [id]
    );
  }
}

export default new ReportRepository();