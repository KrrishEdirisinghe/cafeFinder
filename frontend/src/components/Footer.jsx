import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-roast/60">
      <div className="section-shell flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl font-bold text-secondary">
            Colombo <span className="text-primary">Café</span> Finder
          </p>
          <p className="mt-1 text-sm text-secondary/60">
            Frontend MVP with mock café data — no backend required.
          </p>
        </div>
        <div className="flex gap-4 text-sm text-secondary/70">
          <Link to="/cafes" className="hover:text-primary">
            Browse cafés
          </Link>
        </div>
      </div>
    </footer>
  );
}
