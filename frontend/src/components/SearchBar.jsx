export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search cafés, locations, ambience…",
  dark = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <svg
        className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 ${
          dark ? "text-secondary/50" : "text-accent/40"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
        />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-2xl border py-3.5 pl-12 pr-28 text-sm outline-none transition focus:ring-2 focus:ring-primary/40 sm:text-base ${
          dark
            ? "border-white/15 bg-white/10 text-secondary placeholder:text-secondary/45 backdrop-blur"
            : "border-accent/10 bg-white text-ink placeholder:text-accent/40 shadow-soft"
        }`}
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
      >
        Search
      </button>
    </form>
  );
}
