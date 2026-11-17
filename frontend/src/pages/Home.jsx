import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CafeCard from "../components/CafeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import { getCafes } from "../services/cafeService";
import { featureBadges } from "../utils/cafeDisplay";

export default function Home() {
  const navigate = useNavigate();
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getCafes();
        if (!cancelled) {
          setCafes(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Could not load cafés. Is the API running on port 5000?");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = [...cafes]
    .filter((c) => featureBadges(c).includes("Popular Choice"))
    .slice(0, 3);
  const trending = [...cafes].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const topWeek = [...cafes].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const studySpots = cafes.filter((c) => c.studyFriendly).slice(0, 3);

  const handleSearch = (q) => {
    navigate(`/cafes?q=${encodeURIComponent(q || "")}`);
  };

  return (
    <div>
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80"
          alt="Warm café interior with coffee"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

        <div className="section-shell relative flex min-h-[92vh] flex-col justify-center py-20">
          <p className="animate-fade-up font-display text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl md:text-6xl lg:text-7xl">
            Colombo <span className="text-primary">Café</span> Finder
          </p>
          <h1 className="animate-fade-up-delay mt-5 max-w-2xl font-display text-2xl font-semibold leading-snug text-secondary/95 sm:text-3xl md:text-4xl">
            Find Your Perfect Café in Colombo
          </h1>
          <p className="animate-fade-up-late mt-4 max-w-xl text-base text-secondary/75 sm:text-lg">
            Discover cafés tailored to your taste.
          </p>

          <div className="animate-fade-up-late mt-8 flex max-w-xl flex-wrap gap-3">
            <Link to="/cafes" className="btn-primary">
              Browse cafés
            </Link>
          </div>

          <div className="animate-fade-up-late mt-10 max-w-2xl">
            <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} dark />
          </div>
        </div>
      </section>

      {loading && <LoadingSpinner />}
      {error && (
        <p className="section-shell py-10 text-center text-rose-300">{error}</p>
      )}

      {!loading && !error && (
        <>
          <section className="section-shell py-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-secondary">Featured</h2>
                <p className="mt-1 text-secondary/60">Top-rated picks around Colombo.</p>
              </div>
              <Link to="/cafes" className="text-sm font-semibold text-primary hover:underline">
                See all
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(featured.length ? featured : cafes.slice(0, 3)).map((cafe) => (
                <CafeCard key={cafe.id} cafe={cafe} />
              ))}
            </div>
          </section>

          <section className="border-y border-white/5 bg-roast/40 py-14">
            <div className="section-shell">
              <h2 className="font-display text-3xl font-bold text-secondary">Trending</h2>
              <p className="mt-1 text-secondary/60">Highest-rated spots right now.</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {trending.map((cafe) => (
                  <CafeCard key={cafe.id} cafe={cafe} />
                ))}
              </div>
            </div>
          </section>

          {studySpots.length > 0 && (
            <section className="section-shell py-14">
              <h2 className="font-display text-3xl font-bold text-secondary">Study spots</h2>
              <p className="mt-1 text-secondary/60">Wi-Fi, outlets, and focus-friendly rooms.</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {studySpots.map((cafe) => (
                  <CafeCard key={cafe.id} cafe={cafe} />
                ))}
              </div>
            </section>
          )}

          <section className="section-shell pb-14">
            <h2 className="font-display text-3xl font-bold text-secondary">
              Top Cafés This Week
            </h2>
            <p className="mt-1 text-secondary/60">A quick look at the highest-rated spots.</p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-secondary/95 shadow-card">
              <ul className="divide-y divide-accent/10">
                {topWeek.map((cafe, i) => (
                  <li key={cafe.id}>
                    <Link
                      to={`/cafes/${cafe.id}`}
                      className="flex items-center gap-4 px-4 py-4 transition hover:bg-mist/60 sm:px-6"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-lg font-bold text-primary">
                        {i + 1}
                      </span>
                      <img
                        src={cafe.image}
                        alt=""
                        className="h-14 w-14 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-ink">{cafe.name}</p>
                        <p className="truncate text-sm text-accent/65">{cafe.area}</p>
                      </div>
                      <span className="font-semibold text-primary">
                        {Number(cafe.rating).toFixed(1)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
