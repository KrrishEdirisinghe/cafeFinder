import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Badge from "../components/Badge";
import LoadingSpinner from "../components/LoadingSpinner";
import ReviewForm from "../components/ReviewForm";
import StarRating from "../components/StarRating";
import { getCafeById } from "../services/cafeService";

function whySuitYou(cafe) {
  const reasons = [];
  if ((cafe.badges || []).includes("Study Spot")) {
    reasons.push("Marked as a Study Spot — solid for focus sessions.");
  }
  if ((cafe.badges || []).includes("Best Coffee")) {
    reasons.push("Known for Best Coffee among Colombo locals.");
  }
  if ((cafe.badges || []).includes("Popular Choice")) {
    reasons.push("A Popular Choice with strong community buzz.");
  }
  if (cafe.ambience === "Quiet") {
    reasons.push("Quiet ambience helps you settle in without distractions.");
  }
  if (cafe.ambience === "Outdoor") {
    reasons.push("Outdoor seating brings Colombo's tropical garden energy.");
  }
  if (cafe.ambience === "Cozy") {
    reasons.push("Cozy interiors are ideal for long chats and soft lighting.");
  }
  if (cafe.ambience === "Trendy") {
    reasons.push("Trendy vibe if you want something stylish and social.");
  }
  if ((cafe.tags || []).includes("wifi")) {
    reasons.push("Wi-Fi available for remote work or studying.");
  }
  if ((cafe.tags || []).includes("date-night")) {
    reasons.push("Date-night friendly atmosphere and menu.");
  }
  return reasons.slice(0, 4);
}

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
      } catch {
        if (!cancelled) setError("Café not found.");
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
            {(cafe.badges || []).map((b) => (
              <Badge key={b} label={b} />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
                {cafe.name}
              </h1>
              <p className="mt-2 text-accent/70">
                {cafe.location} · {cafe.cuisine} · {cafe.ambience} · {cafe.price}
              </p>
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
            {(cafe.tags || []).map((tag) => (
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
            </div>
            <div className="rounded-xl bg-mist/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent/55">
                Opening hours
              </p>
              <p className="mt-1 font-medium text-ink">{cafe.openingHours}</p>
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

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <section>
            <h2 className="font-display text-2xl font-bold text-secondary">Reviews</h2>
            <ul className="mt-4 space-y-3">
              {(cafe.reviews || []).length === 0 && (
                <li className="text-secondary/60">No reviews yet — be the first!</li>
              )}
              {(cafe.reviews || []).map((review) => (
                <li
                  key={review.id}
                  className="rounded-xl border border-accent/10 bg-secondary p-4 shadow-soft"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-ink">{review.name}</p>
                    <StarRating value={review.rating} size="sm" />
                  </div>
                  <p className="mt-2 text-sm text-accent/80">{review.comment}</p>
                  <p className="mt-2 text-xs text-accent/45">{review.date}</p>
                </li>
              ))}
            </ul>
          </section>

          <ReviewForm cafeId={cafe.id} onSuccess={setCafe} />
        </div>

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
