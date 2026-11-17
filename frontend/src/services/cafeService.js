import api from "./api";

function toError(err, fallback) {
  const message =
    err.response?.data?.message || err.message || fallback || "Request failed";
  const error = new Error(message);
  error.status = err.response?.status;
  throw error;
}

export async function getCafes(params = {}) {
  try {
    const cleaned = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
    );
    const { data } = await api.get("/cafes", { params: cleaned });
    return data;
  } catch (err) {
    toError(err, "Could not load cafés");
  }
}

export async function getCafeById(id) {
  try {
    const { data } = await api.get(`/cafes/${id}`);
    return data;
  } catch (err) {
    toError(err, "Café not found");
  }
}

export async function searchCafes(query = "") {
  try {
    const { data } = await api.get("/cafes/search", {
      params: { query },
    });
    return data;
  } catch (err) {
    toError(err, "Search failed");
  }
}

export async function createCafe(payload) {
  try {
    const { data } = await api.post("/cafes", payload);
    return data;
  } catch (err) {
    toError(err, "Could not create café");
  }
}
