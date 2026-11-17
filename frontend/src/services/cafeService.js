import seedCafes from "../data/cafes";

/** In-memory store so reviews persist for the session. */
let cafes = structuredClone(seedCafes);

function averageRating(reviews) {
  if (!reviews?.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + Number(r.rating), 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function getCafes() {
  return Promise.resolve(structuredClone(cafes));
}

export function getCafeById(id) {
  const cafe = cafes.find((c) => c.id === String(id));
  if (!cafe) {
    return Promise.reject(new Error("Café not found"));
  }
  return Promise.resolve(structuredClone(cafe));
}

export function searchCafes(query = "") {
  const q = String(query).trim().toLowerCase();
  if (!q) return getCafes();
  const results = cafes.filter((c) => {
    const haystack = [
      c.name,
      c.location,
      c.ambience,
      c.cuisine,
      c.description,
      ...(c.tags || []),
      ...(c.badges || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
  return Promise.resolve(structuredClone(results));
}

export function filterCafes({ budget, ambience, cuisine, rating } = {}) {
  let results = [...cafes];

  if (budget) {
    results = results.filter((c) => c.price === budget);
  }
  if (ambience) {
    results = results.filter(
      (c) => c.ambience.toLowerCase() === String(ambience).toLowerCase()
    );
  }
  if (cuisine) {
    results = results.filter((c) =>
      c.cuisine.toLowerCase().includes(String(cuisine).toLowerCase())
    );
  }
  if (rating) {
    const min = Number(rating);
    if (!Number.isNaN(min)) {
      results = results.filter((c) => Number(c.rating) >= min);
    }
  }

  return Promise.resolve(structuredClone(results));
}

export function addReview(id, { name, rating, comment }) {
  const index = cafes.findIndex((c) => c.id === String(id));
  if (index === -1) {
    return Promise.reject(new Error("Café not found"));
  }
  if (!name || !comment || rating === undefined) {
    return Promise.reject(new Error("name, rating, and comment are required"));
  }

  const numericRating = Number(rating);
  if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
    return Promise.reject(new Error("rating must be between 1 and 5"));
  }

  const review = {
    id: `r${id}-${Date.now()}`,
    name: String(name).trim(),
    rating: numericRating,
    comment: String(comment).trim(),
    date: new Date().toISOString().slice(0, 10),
  };

  cafes[index] = {
    ...cafes[index],
    reviews: [review, ...(cafes[index].reviews || [])],
  };
  cafes[index].rating = averageRating(cafes[index].reviews);

  return Promise.resolve({
    message: "Review added successfully",
    review,
    cafe: structuredClone(cafes[index]),
  });
}
