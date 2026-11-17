export default function StarRating({
  value = 0,
  max = 5,
  size = "md",
  interactive = false,
  onChange,
}) {
  const sizeClass = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-7 w-7" : "h-5 w-5";

  return (
    <div className="inline-flex items-center gap-0.5" role={interactive ? "radiogroup" : "img"} aria-label={`${value} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= Math.round(Number(value));
        const star = (
          <svg
            key={starValue}
            className={`${sizeClass} ${filled ? "text-primary" : "text-accent/25"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );

        if (!interactive) return star;

        return (
          <button
            key={starValue}
            type="button"
            className="rounded p-0.5 transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => onChange?.(starValue)}
            aria-label={`${starValue} stars`}
          >
            {star}
          </button>
        );
      })}
    </div>
  );
}
