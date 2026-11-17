import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import cafeRoutes from "./routes/cafes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: (
      process.env.CORS_ORIGIN ||
      "http://localhost:5173,http://127.0.0.1:5173"
    )
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean),
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    name: "Colombo Café Finder API",
    base: "/api",
    endpoints: [
      "GET /api/cafes",
      "GET /api/cafes/:id",
      "GET /api/cafes/search?query=",
      "POST /api/cafes",
    ],
  });
});

app.use("/api/cafes", cafeRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Café Finder API running on http://localhost:${PORT}/api`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});
