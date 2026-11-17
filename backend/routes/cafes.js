import { Router } from "express";
import {
  createCafe,
  getCafeById,
  getCafes,
  searchCafes,
} from "../controllers/cafeController.js";

const router = Router();

router.get("/search", searchCafes);
router.get("/", getCafes);
router.post("/", createCafe);
router.get("/:id", getCafeById);

export default router;
