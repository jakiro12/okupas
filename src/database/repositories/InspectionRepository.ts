import SQLiteService from "../sqlite";
import { Inspection, INSPECTION_TABLE } from "../schema/InspectionTable";

class InspectionRepository {
  async create(inspection: Inspection): Promise<void> {
    const db = SQLiteService.getDatabase();

    await db.runAsync(
      `
      INSERT INTO ${INSPECTION_TABLE} (
        id,
        name,
        createdBy,
        address,
        city,
        province,
        observations,
        createdAt,
        updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        inspection.id,
        inspection.name,
        inspection.createdBy,
        inspection.address,
        inspection.city,
        inspection.province,
        inspection.observations,
        inspection.createdAt,
        inspection.updatedAt
      ]
    );
  }

  async findById(id: string): Promise<Inspection | null> {
    const db = SQLiteService.getDatabase();

    const inspection = await db.getFirstAsync<Inspection>(
      `
      SELECT *
      FROM ${INSPECTION_TABLE}
      WHERE id = ?
      `,
      [id]
    );

    return inspection ?? null;
  }

  async findAll(): Promise<Inspection[]> {
    const db = SQLiteService.getDatabase();

    return await db.getAllAsync<Inspection>(
      `
      SELECT *
      FROM ${INSPECTION_TABLE}
      ORDER BY createdAt DESC
      `
    );
  }
  async update(inspection: Inspection): Promise<void> {
  const db = SQLiteService.getDatabase();

  await db.runAsync(
    `
    UPDATE ${INSPECTION_TABLE}
    SET
      name = ?,
      createdBy = ?,
      address = ?,
      city = ?,
      province = ?,
      observations = ?,
      updatedAt = ?
    WHERE id = ?
    `,
    [
      inspection.name,
      inspection.createdBy,
      inspection.address,
      inspection.city,
      inspection.province,
      inspection.observations,
      inspection.updatedAt,
      inspection.id,
    ]
  );
}
async delete(id: string): Promise<void> {
  const db = SQLiteService.getDatabase();

  await db.runAsync(
    `
    DELETE FROM ${INSPECTION_TABLE}
    WHERE id = ?
    `,
    [id]
  );
}
}

export default new InspectionRepository();