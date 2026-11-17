# Colombo Café Finder

Discover cafés across Colombo with a React frontend and an Express + **SQLite** API. No MongoDB, Docker, or cloud database required.

## Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js, better-sqlite3 (local file DB)
- **API base:** `http://localhost:5000/api`

## Prerequisites

- Node.js 18+ only

## Setup

```bash
# from repo root (after checking out this branch)
npm install          # installs root + backend + frontend deps (via postinstall)
npm run seed         # writes 27 cafés into backend/data/cafes.db
npm run dev          # starts API (:5000) + Vite (:5173)
```

Open **http://localhost:5173**.

Optional: `cp backend/.env.example backend/.env` (defaults work without it).

### Run packages separately

```bash
cd backend && npm install && npm run seed && npm run dev
# another terminal
cd frontend && npm install && npm run dev
```

Optional frontend env (`frontend/.env`):

```bash
VITE_API_URL=http://localhost:5000/api
```

## Environment variables (`backend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `SQLITE_PATH` | Path to SQLite file | `backend/data/cafes.db` |
| `PORT` | API port | `5000` |
| `CORS_ORIGIN` | Allowed frontend origins (comma-separated) | `http://localhost:5173,...` |

The database file is created on seed/start and is gitignored.

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/cafes` | List cafés. Query: `area`, `wifi`, `powerOutlets`, `studyFriendly`, `outdoorSeating` |
| GET | `/api/cafes/search?query=` | Search name, description, address, area |
| GET | `/api/cafes/:id` | Café by id |
| POST | `/api/cafes` | Create a café |

## Project layout

```
backend/
  config/db.js          # SQLite connection + schema
  models/Cafe.js        # data access
  controllers/, routes/
  data/cafes.seed.json
  data/cafes.db         # generated locally (gitignored)
  scripts/seed.js
  server.js
frontend/
  src/pages, components, services, utils, App.jsx
```
