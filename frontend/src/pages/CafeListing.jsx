import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CafeCard from "../components/CafeCard";
import FilterPanel from "../components/FilterPanel";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import { getCafes, searchCafes } from "../services/cafeService";

const defaultFilters = {
  area: "",
  wifi: "",
  powerOutlets: "",
  studyFriendly: "",
  outdoorSeating: "",
  sort: "rating",
};

export default function CafeListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [filters, setFilters] = useState(defaultFilters);
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (q, f) => {
    setLoading(true);
    setError("");
    try {
      const filterParams = {
        area: f.area || undefined,
        wifi: f.wifi || undefined,
        powerOutlets: f.powerOutlets || undefined,
        studyFriendly: f.studyFriendly || undefined,
        outdoorSeating: f.outdoorSeating || undefined,
      };
      const hasFilters = Object.values(filterParams).some(Boolean);

      let data;
      if (q.trim() && !hasFilters) {
        data = await searchCafes(q.trim());
      } else if (hasFilters) {
        data = await getCafes(filterParams);
        if (q.trim()) {
          const needle = q.trim().toLowerCase();
          data = data.filter((c) =>
            [c.name, c.area, c.address, c.description]
              .join(" ")
              .toLowerCase()
              .includes(needle)
          );
        }
      } else {
        data = await getCafes();
      }
      setCafes(data);
    } catch (err) {
      setError(err.message || "Failed to load cafés");
      setCafes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(initialQ, defaultFilters);
  }, [load, initialQ]);

  useEffect(() => {
    const t = setTimeout(() => {
      load(query, filters);
      if (query) setSearchParams({ q: query });
      else setSearchParams({});
    }, 280);
    return () => clearTimeout(t);
  }, [query, filters, load, setSearchParams]);

  const sorted = useMemo(() => {
    const list = [...cafes];
    if (filters.sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [cafes, filters.sort]);

  return (
    <div className="section-shell py-10">
      <div className="mb-8 max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-secondary">All Cafés</h1>
        <p className="mt-2 text-secondary/65">
          Search and filter Colombo cafés by area and amenities.
        </p>
      </div>

      <div className="mb-6 max-w-2xl">
        <SearchBar value={query} onChange={setQuery} onSubmit={() => load(query, filters)} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(defaultFilters)}
        />

        <div>
          <p className="mb-4 text-sm text-secondary/60">
            {loading ? "Loading…" : `${sorted.length} café${sorted.length === 1 ? "" : "s"} found`}
          </p>
          {loading && <LoadingSpinner />}
          {error && <p className="mb-4 text-rose-300">{error}</p>}
          {!loading && !error && sorted.length === 0 && (
            <p className="rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center text-secondary/70">
              No cafés match those filters. Try resetting.
            </p>
          )}
          {!loading && !error && (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {sorted.map((cafe) => (
                <CafeCard key={cafe.id} cafe={cafe} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
