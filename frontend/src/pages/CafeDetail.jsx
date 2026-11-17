import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Badge from "../components/Badge";
import LoadingSpinner from "../components/LoadingSpinner";
import StarRating from "../components/StarRating";
import { getCafeById } from "../services/cafeService";
import {
  featureBadges,
  featureTags,
  formatOpeningHours,
  whySuitYou,
} from "../utils/cafeDisplay";

export default function CafeDetail() {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await getCafeById(id);
        if (!cancelled) {
          setCafe(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Café not found.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <LoadingSpinner label="Loading café…" />;
  if (error || !cafe) {
    return (
      <div className="section-shell py-16 text-center">
        <p className="text-rose-300">{error || "Café not found"}</p>
        <Link to="/cafes" className="btn-primary mt-6 inline-flex">
          Back to listing
        </Link>
      </div>
    );
  }

  const badges = featureBadges(cafe);
  const tags = featureTags(cafe);
  const reasons = whySuitYou(cafe);

  return (
    <div>
      <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden sm:h-[48vh]">
        <img src={cafe.image} alt={cafe.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      </div>

      <div className="section-shell relative -mt-16 pb-16">
        <div className="rounded-2xl border border-white/10 bg-secondary p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <Badge key={b} label={b} />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
                {cafe.name}
              </h1>
              <p className="mt-2 text-accent/70">{cafe.area}</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-mist px-4 py-2">
              <StarRating value={cafe.rating} />
              <span className="text-lg font-bold text-accent">
                {Number(cafe.rating).toFixed(1)}
              </span>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-accent/85">
            {cafe.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-mist px-3 py-1 text-xs font-semibold text-accent"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-mist/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent/55">
                Address
              </p>
              <p className="mt-1 font-medium text-ink">{cafe.address}</p>
              <p className="mt-2 text-xs text-accent/55">
                {cafe.latitude?.toFixed?.(5)}, {cafe.longitude?.toFixed?.(5)}
              </p>
            </div>
            <div className="rounded-xl bg-mist/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent/55">
                Opening hours
              </p>
              <p className="mt-1 text-sm font-medium leading-relaxed text-ink">
                {formatOpeningHours(cafe.openingHours)}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="font-display text-2xl font-bold text-secondary">
            Why this café may suit you
          </h2>
          <ul className="mt-4 space-y-2">
            {reasons.map((r) => (
              <li key={r} className="flex gap-2 text-secondary/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-accent/10 bg-secondary p-6 shadow-soft">
          <h2 className="font-display text-2xl font-bold text-ink">Amenities</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["Wi-Fi", cafe.wifi],
              ["Power outlets", cafe.powerOutlets],
              ["Air conditioning", cafe.airConditioning],
              ["Outdoor seating", cafe.outdoorSeating],
              ["Study friendly", cafe.studyFriendly],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl bg-mist/70 px-4 py-3 text-sm"
              >
                <dt className="font-medium text-ink">{label}</dt>
                <dd className={value ? "font-semibold text-primary" : "text-accent/50"}>
                  {value ? "Yes" : "No"}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <Link
          to="/cafes"
          className="mt-10 inline-flex text-sm font-semibold text-primary hover:underline"
        >
          ← Back to all cafés
        </Link>
      </div>
    </div>
  );
}
