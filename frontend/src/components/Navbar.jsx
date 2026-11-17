import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/cafes", label: "Cafés" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-soft transition group-hover:scale-105">
            CF
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-secondary sm:text-xl">
            Colombo <span className="text-primary">Café</span> Finder
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-secondary/80 hover:bg-white/5 hover:text-secondary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/cafes" className="btn-primary ml-2 !py-2 !text-sm">
            Browse cafés
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg border border-white/15 p-2 text-secondary md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink/95 px-4 py-3 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive ? "bg-primary/20 text-primary" : "text-secondary/90"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
