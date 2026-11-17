import dotenv from "dotenv";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { closeDb, connectDB, getDbPath } from "../config/db.js";
import Cafe from "../models/Cafe.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") });

function seed() {
  connectDB();
  const raw = readFileSync(join(__dirname, "..", "data", "cafes.seed.json"), "utf8");
  const cafes = JSON.parse(raw);

  Cafe.deleteAll();
  const inserted = Cafe.insertMany(cafes);
  console.log(`Seeded ${inserted.length} cafés into SQLite (${getDbPath()}).`);
  closeDb();
}

try {
  seed();
} catch (err) {
  console.error("Seed failed:", err.message);
  closeDb();
  process.exit(1);
}
