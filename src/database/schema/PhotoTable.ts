export const PHOTO_TABLE = "photos";

export interface Photo {
  id: string;

  inspectionId: string;

  fileName: string;

  uri: string;

  width: number;

  height: number;

  fileSize: number;

  mimeType: string;

  createdAt: string;
}

export const createPhotoTable = `
CREATE TABLE IF NOT EXISTS photos (
    id TEXT PRIMARY KEY NOT NULL,
    inspectionId TEXT NOT NULL,

    fileName TEXT NOT NULL,
    uri TEXT NOT NULL,

    width INTEGER NOT NULL,
    height INTEGER NOT NULL,

    fileSize INTEGER,
    mimeType TEXT,

    createdAt TEXT NOT NULL,

    FOREIGN KEY (inspectionId)
        REFERENCES inspections(id)
        ON DELETE CASCADE
);
`;