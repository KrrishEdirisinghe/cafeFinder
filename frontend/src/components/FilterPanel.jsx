import {
  ambienceOptions,
  cuisineOptions,
  ratingOptions,
  sortOptions,
} from "../data/preferences";

export default function FilterPanel({ filters, onChange, onReset }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <aside className="rounded-2xl border border-accent/10 bg-secondary p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-primary hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-accent/70">
            Budget
          </span>
          <select
            className="input-field !py-2.5"
            value={filters.budget}
            onChange={(e) => update("budget", e.target.value)}
          >
            <option value="">Any</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-accent/70">
            Ambience
          </span>
          <select
            className="input-field !py-2.5"
            value={filters.ambience}
            onChange={(e) => update("ambience", e.target.value)}
          >
            <option value="">Any</option>
            {ambienceOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-accent/70">
            Cuisine
          </span>
          <select
            className="input-field !py-2.5"
            value={filters.cuisine}
            onChange={(e) => update("cuisine", e.target.value)}
          >
            <option value="">Any</option>
            {cuisineOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-accent/70">
            Min Rating
          </span>
          <select
            className="input-field !py-2.5"
            value={filters.rating}
            onChange={(e) => update("rating", e.target.value)}
          >
            <option value="">Any</option>
            {ratingOptions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-accent/70">
            Sort
          </span>
          <select
            className="input-field !py-2.5"
            value={filters.sort}
            onChange={(e) => update("sort", e.target.value)}
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </aside>
  );
}
