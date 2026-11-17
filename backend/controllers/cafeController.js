import Cafe from "../models/Cafe.js";

function parseBoolean(value) {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value === "boolean") return value;
  const normalized = String(value).trim().toLowerCase();
  if (["true", "1", "yes"].includes(normalized)) return true;
  if (["false", "0", "no"].includes(normalized)) return false;
  return undefined;
}

export function getCafes(req, res) {
  try {
    const { area, wifi, powerOutlets, studyFriendly, outdoorSeating } = req.query;
    const filter = {};

    if (area) filter.area = area;
    const wifiVal = parseBoolean(wifi);
    if (wifiVal !== undefined) filter.wifi = wifiVal;
    const powerVal = parseBoolean(powerOutlets);
    if (powerVal !== undefined) filter.powerOutlets = powerVal;
    const studyVal = parseBoolean(studyFriendly);
    if (studyVal !== undefined) filter.studyFriendly = studyVal;
    const outdoorVal = parseBoolean(outdoorSeating);
    if (outdoorVal !== undefined) filter.outdoorSeating = outdoorVal;

    const cafes = Cafe.find(filter);
    res.json(cafes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cafés", error: err.message });
  }
}

export function getCafeById(req, res) {
  try {
    const cafe = Cafe.findById(req.params.id);
    if (!cafe) {
      return res.status(404).json({ message: "Café not found" });
    }
    res.json(cafe);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch café", error: err.message });
  }
}

export function searchCafes(req, res) {
  try {
    const query = String(req.query.query || req.query.q || "").trim();
    const cafes = Cafe.search(query);
    res.json(cafes);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
}

export function createCafe(req, res) {
  try {
    const cafe = Cafe.create(req.body);
    res.status(201).json(cafe);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message, errors: err.errors });
    }
    res.status(500).json({ message: "Failed to create café", error: err.message });
  }
}
