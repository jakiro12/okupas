export const REPORT_TABLE = "reports";

export interface Report {
  id: string;

  inspectionId: string;

  fileName: string;

  uri: string;

  createdAt: string;
}

export const createReportTable = `
CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY NOT NULL,

    inspectionId TEXT NOT NULL,

    fileName TEXT NOT NULL,

    uri TEXT NOT NULL,

    createdAt TEXT NOT NULL,

    FOREIGN KEY (inspectionId)
        REFERENCES inspections(id)
        ON DELETE CASCADE
);
`;