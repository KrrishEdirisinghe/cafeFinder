const styles = {
  "Study Spot": "bg-sky-100 text-sky-900",
  "Work Friendly": "bg-amber-100 text-amber-900",
  Outdoor: "bg-emerald-100 text-emerald-900",
  "Popular Choice": "bg-rose-100 text-rose-900",
  "Best Coffee": "bg-amber-100 text-amber-900",
};

export default function Badge({ label }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide ${
        styles[label] || "bg-mist text-accent"
      }`}
    >
      {label}
    </span>
  );
}
