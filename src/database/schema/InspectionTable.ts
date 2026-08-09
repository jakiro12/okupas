export const INSPECTION_TABLE = "inspections";

export interface Inspection {
  id: string;

  name: string;

  createdBy: string;

  address: string;

  city: string;

  province: string;

  observations: string;

  createdAt: string;

  updatedAt: string;
}

export const createInspectionTable = `
CREATE TABLE IF NOT EXISTS inspections (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    createdBy TEXT NOT NULL,
    address TEXT,
    city TEXT,
    province TEXT,
    observations TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
);
`;