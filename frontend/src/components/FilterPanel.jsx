import { areaOptions, booleanFilters, sortOptions } from "../data/preferences";

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
            Area
          </span>
          <select
            className="input-field !py-2.5"
            value={filters.area}
            onChange={(e) => update("area", e.target.value)}
          >
            <option value="">Any</option>
            {areaOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-accent/70">
            Features
          </span>
          <div className="space-y-2">
            {booleanFilters.map((f) => (
              <label key={f.key} className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-accent/30 text-primary focus:ring-primary"
                  checked={filters[f.key] === "true"}
                  onChange={(e) =>
                    update(f.key, e.target.checked ? "true" : "")
                  }
                />
                {f.label}
              </label>
            ))}
          </div>
        </div>

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
