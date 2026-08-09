import SQLiteService from "../sqlite";
import { PHOTO_TABLE, Photo } from "../schema/PhotoTable";

class PhotoRepository {
  async create(photo: Photo): Promise<void> {
    const db = SQLiteService.getDatabase();

    await db.runAsync(
      `
      INSERT INTO ${PHOTO_TABLE} (
        id,
        inspectionId,
        fileName,
        uri,
        width,
        height,
        fileSize,
        mimeType,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        photo.id,
        photo.inspectionId,
        photo.fileName,
        photo.uri,
        photo.width,
        photo.height,
        photo.fileSize,
        photo.mimeType,
        photo.createdAt,
      ]
    );
  }

  async findByInspectionId(
    inspectionId: string
  ): Promise<Photo[]> {
    const db = SQLiteService.getDatabase();

    return await db.getAllAsync<Photo>(
      `
      SELECT *
      FROM ${PHOTO_TABLE}
      WHERE inspectionId = ?
      ORDER BY createdAt ASC
      `,
      [inspectionId]
    );
  }

  async delete(id: string): Promise<void> {
    const db = SQLiteService.getDatabase();

    await db.runAsync(
      `
      DELETE FROM ${PHOTO_TABLE}
      WHERE id = ?
      `,
      [id]
    );
  }

  async countByInspectionId(
    inspectionId: string
  ): Promise<number> {
    const db = SQLiteService.getDatabase();

    const result = await db.getFirstAsync<{
      total: number;
    }>(
      `
      SELECT COUNT(*) as total
      FROM ${PHOTO_TABLE}
      WHERE inspectionId = ?
      `,
      [inspectionId]
    );

    return result?.total ?? 0;
  }
}

export default new PhotoRepository();