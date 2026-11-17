export default function LoadingSpinner({ label = "Brewing results…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-secondary/80">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
