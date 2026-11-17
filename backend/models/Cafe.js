import { getDb } from "../config/db.js";

const ALLOWED_AREAS = new Set([
  "Colombo 03",
  "Colombo 04",
  "Colombo 05",
  "Colombo 07",
  "Rajagiriya",
  "Nugegoda",
]);

function toBool(value) {
  return Boolean(value);
}

function fromBool(value, fallback = false) {
  if (value === undefined || value === null) return fallback ? 1 : 0;
  return value ? 1 : 0;
}

function mapRow(row) {
  if (!row) return null;
  let openingHours = row.openingHours;
  if (typeof openingHours === "string") {
    try {
      openingHours = JSON.parse(openingHours);
    } catch {
      /* keep string */
    }
  }
  return {
    id: String(row.id),
    name: row.name,
    description: row.description,
    address: row.address,
    area: row.area,
    latitude: row.latitude,
    longitude: row.longitude,
    image: row.image,
    rating: row.rating,
    wifi: toBool(row.wifi),
    powerOutlets: toBool(row.powerOutlets),
    airConditioning: toBool(row.airConditioning),
    outdoorSeating: toBool(row.outdoorSeating),
    studyFriendly: toBool(row.studyFriendly),
    openingHours,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function validateCafe(input, { partial = false } = {}) {
  const errors = {};
  const data = { ...input };

  if (!partial || data.name !== undefined) {
    if (!data.name || !String(data.name).trim()) errors.name = "name is required";
  }
  if (!partial || data.description !== undefined) {
    if (!data.description || !String(data.description).trim()) {
      errors.description = "description is required";
    }
  }
  if (!partial || data.address !== undefined) {
    if (!data.address || !String(data.address).trim()) {
      errors.address = "address is required";
    }
  }
  if (!partial || data.area !== undefined) {
    if (!data.area || !ALLOWED_AREAS.has(data.area)) {
      errors.area = `area must be one of: ${[...ALLOWED_AREAS].join(", ")}`;
    }
  }
  if (!partial || data.latitude !== undefined) {
    if (Number.isNaN(Number(data.latitude))) errors.latitude = "latitude is required";
  }
  if (!partial || data.longitude !== undefined) {
    if (Number.isNaN(Number(data.longitude))) errors.longitude = "longitude is required";
  }
  if (!partial || data.image !== undefined) {
    if (!data.image || !String(data.image).trim()) errors.image = "image is required";
  }
  if (!partial || data.rating !== undefined) {
    const rating = Number(data.rating);
    if (Number.isNaN(rating) || rating < 0 || rating > 5) {
      errors.rating = "rating must be between 0 and 5";
    }
  }
  if (!partial || data.openingHours !== undefined) {
    if (!data.openingHours || typeof data.openingHours !== "object") {
      errors.openingHours = "openingHours object is required";
    }
  }

  if (Object.keys(errors).length) {
    const err = new Error("Validation failed");
    err.name = "ValidationError";
    err.errors = errors;
    throw err;
  }

  return data;
}

const Cafe = {
  find(filter = {}) {
    const db = getDb();
    const where = [];
    const params = {};

    if (filter.area) {
      where.push("area = @area");
      params.area = filter.area;
    }
    if (filter.wifi !== undefined) {
      where.push("wifi = @wifi");
      params.wifi = fromBool(filter.wifi);
    }
    if (filter.powerOutlets !== undefined) {
      where.push("powerOutlets = @powerOutlets");
      params.powerOutlets = fromBool(filter.powerOutlets);
    }
    if (filter.studyFriendly !== undefined) {
      where.push("studyFriendly = @studyFriendly");
      params.studyFriendly = fromBool(filter.studyFriendly);
    }
    if (filter.outdoorSeating !== undefined) {
      where.push("outdoorSeating = @outdoorSeating");
      params.outdoorSeating = fromBool(filter.outdoorSeating);
    }

    const sql = `
      SELECT * FROM cafes
      ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
      ORDER BY rating DESC, name ASC
    `;
    return db.prepare(sql).all(params).map(mapRow);
  },

  findById(id) {
    const db = getDb();
    const row = db.prepare("SELECT * FROM cafes WHERE id = ?").get(Number(id));
    return mapRow(row);
  },

  search(query) {
    const db = getDb();
    const q = String(query || "").trim();
    if (!q) return this.find();

    const like = `%${q.replace(/%/g, "\\%").replace(/_/g, "\\_")}%`;
    const rows = db
      .prepare(
        `
        SELECT * FROM cafes
        WHERE name LIKE @like ESCAPE '\\'
           OR description LIKE @like ESCAPE '\\'
           OR address LIKE @like ESCAPE '\\'
           OR area LIKE @like ESCAPE '\\'
        ORDER BY rating DESC, name ASC
      `
      )
      .all({ like });
    return rows.map(mapRow);
  },

  create(input) {
    const data = validateCafe(input);
    const db = getDb();
    const now = new Date().toISOString();

    const info = db
      .prepare(
        `
        INSERT INTO cafes (
          name, description, address, area, latitude, longitude, image, rating,
          wifi, powerOutlets, airConditioning, outdoorSeating, studyFriendly,
          openingHours, createdAt, updatedAt
        ) VALUES (
          @name, @description, @address, @area, @latitude, @longitude, @image, @rating,
          @wifi, @powerOutlets, @airConditioning, @outdoorSeating, @studyFriendly,
          @openingHours, @createdAt, @updatedAt
        )
      `
      )
      .run({
        name: String(data.name).trim(),
        description: String(data.description).trim(),
        address: String(data.address).trim(),
        area: data.area,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        image: String(data.image).trim(),
        rating: Number(data.rating ?? 0),
        wifi: fromBool(data.wifi),
        powerOutlets: fromBool(data.powerOutlets),
        airConditioning: fromBool(data.airConditioning),
        outdoorSeating: fromBool(data.outdoorSeating),
        studyFriendly: fromBool(data.studyFriendly),
        openingHours: JSON.stringify(data.openingHours),
        createdAt: now,
        updatedAt: now,
      });

    return this.findById(info.lastInsertRowid);
  },

  deleteAll() {
    const db = getDb();
    db.prepare("DELETE FROM cafes").run();
  },

  insertMany(cafes) {
    const db = getDb();
    const insert = db.transaction((items) => {
      const created = [];
      for (const item of items) {
        created.push(this.create(item));
      }
      return created;
    });
    return insert(cafes);
  },
};

export default Cafe;
