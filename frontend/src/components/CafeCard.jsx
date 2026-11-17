import { Link } from "react-router-dom";
import Badge from "./Badge";
import StarRating from "./StarRating";
import { featureBadges, featureTags } from "../utils/cafeDisplay";

export default function CafeCard({ cafe, reason }) {
  const badges = cafe.badges?.length ? cafe.badges : featureBadges(cafe);
  const tags = cafe.tags?.length ? cafe.tags : featureTags(cafe);

  return (
    <Link
      to={`/cafes/${cafe.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-secondary shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-20px_rgba(217,119,6,0.45)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={cafe.image}
          alt={cafe.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-80" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <Badge key={b} label={b} />
          ))}
        </div>
        <span className="absolute bottom-3 right-3 rounded-lg bg-ink/80 px-2.5 py-1 text-sm font-semibold text-secondary backdrop-blur">
          {cafe.area}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-ink transition group-hover:text-primary">
            {cafe.name}
          </h3>
          <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-accent">
            <StarRating value={cafe.rating} size="sm" />
            <span>{Number(cafe.rating).toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-accent/70 line-clamp-2">{cafe.address}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-mist px-2 py-0.5 text-[11px] font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        {reason && (
          <p className="mt-1 border-t border-accent/10 pt-2 text-xs text-primary">{reason}</p>
        )}
      </div>
    </Link>
  );
}
