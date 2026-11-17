# Colombo Café Finder

Frontend-only MVP for discovering cafés in Colombo. Browse, search, filter, and review using **mock data** — no backend or auth required.

## Stack

- React + Vite
- Tailwind CSS
- React Router

## Pages

1. **Home** — hero, search, Featured / Trending / Top Cafés This Week
2. **Café listing** — all cafés with search, filters (Budget, Ambience, Cuisine, Rating), and sort
3. **Café detail** — info, tags, “why it may suit you”, reviews, and add-review form (in-session mock persistence)

## Run

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually **http://localhost:5173**).

## Project layout

```
frontend/
  src/
    pages/         Home, CafeListing, CafeDetail
    components/    cards, filters, navbar, review form, …
    data/          mock cafés + filter options
    services/      cafeService (in-memory search/filter/reviews)
    App.jsx
```

## Notes

- Seed data lives in `frontend/src/data/cafes.js` (15 Colombo cafés).
- Reviews update the in-memory store for the current browser session only.
