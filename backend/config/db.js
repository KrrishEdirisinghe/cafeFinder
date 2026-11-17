import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultPath = join(__dirname, "..", "data", "cafes.db");

let db;

export function getDbPath() {
  return process.env.SQLITE_PATH || defaultPath;
}

export function connectDB() {
  if (db) return db;

  const dbPath = getDbPath();
  mkdirSync(dirname(dbPath), { recursive: true });

  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS cafes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      address TEXT NOT NULL,
      area TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      image TEXT NOT NULL,
      rating REAL NOT NULL DEFAULT 0,
      wifi INTEGER NOT NULL DEFAULT 0,
      powerOutlets INTEGER NOT NULL DEFAULT 0,
      airConditioning INTEGER NOT NULL DEFAULT 0,
      outdoorSeating INTEGER NOT NULL DEFAULT 0,
      studyFriendly INTEGER NOT NULL DEFAULT 0,
      openingHours TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_cafes_area ON cafes(area);
    CREATE INDEX IF NOT EXISTS idx_cafes_wifi ON cafes(wifi);
    CREATE INDEX IF NOT EXISTS idx_cafes_power ON cafes(powerOutlets);
    CREATE INDEX IF NOT EXISTS idx_cafes_study ON cafes(studyFriendly);
    CREATE INDEX IF NOT EXISTS idx_cafes_outdoor ON cafes(outdoorSeating);
    CREATE INDEX IF NOT EXISTS idx_cafes_rating ON cafes(rating);
  `);

  console.log(`SQLite connected: ${dbPath}`);
  return db;
}

export function getDb() {
  if (!db) return connectDB();
  return db;
}

export function closeDb() {
  if (db) {
    db.close();
    db = undefined;
  }
}
