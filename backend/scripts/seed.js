import dotenv from "dotenv";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { connectDB } from "../config/db.js";
import Cafe from "../models/Cafe.js";
import mongoose from "mongoose";

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), "..", ".env") });

const __dirname = dirname(fileURLToPath(import.meta.url));

async function seed() {
  await connectDB();
  const raw = readFileSync(join(__dirname, "..", "data", "cafes.seed.json"), "utf8");
  const cafes = JSON.parse(raw);

  await Cafe.deleteMany({});
  await Cafe.createIndexes();
  const inserted = await Cafe.insertMany(cafes);
  console.log(`Seeded ${inserted.length} cafés into MongoDB.`);
  await mongoose.connection.close();
}

seed().catch(async (err) => {
  console.error("Seed failed:", err.message);
  try {
    await mongoose.connection.close();
  } catch {
    /* ignore */
  }
  process.exit(1);
});
