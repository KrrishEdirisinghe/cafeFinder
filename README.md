# Colombo Café Finder

Discover cafés across Colombo with a React frontend and an Express + MongoDB API.

## Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js, Mongoose / MongoDB
- **API base:** `http://localhost:5000/api`

## Prerequisites

- Node.js 18+
- A MongoDB database — either:
  - **Local:** MongoDB running on `mongodb://127.0.0.1:27017`
  - **Atlas:** a free cluster connection string (`mongodb+srv://…`)

## Setup

```bash
# from repo root
cp backend/.env.example backend/.env
# edit MONGODB_URI if you use Atlas instead of local MongoDB

npm install          # installs root + backend + frontend deps (via postinstall)
npm run seed         # populates ≥25 Colombo cafés
npm run dev          # starts API (:5000) + Vite (:5173)
```

Open **http://localhost:5173**.

### Run packages separately

```bash
# Backend
cd backend
cp .env.example .env   # if needed
npm install
npm run seed
npm run dev

# Frontend (another terminal)
cd frontend
npm install
npm run dev
```

Optional frontend env (`frontend/.env`):

```bash
VITE_API_URL=http://localhost:5000/api
```

## Environment variables (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/cafeFinder` or Atlas `mongodb+srv://…` |
| `PORT` | API port | `5000` |
| `CORS_ORIGIN` | Allowed frontend origins (comma-separated) | `http://localhost:5173` |

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/cafes` | List cafés. Query: `area`, `wifi`, `powerOutlets`, `studyFriendly`, `outdoorSeating` |
| GET | `/api/cafes/search?query=` | Text name, description, address, area |
| GET | `/api/cafes/:id` | Café by id |
| POST | `/api/cafes` | Create a café |

## Project layout

```
backend/
  config/db.js
  models/Cafe.js
  controllers/cafeController.js
  routes/cafes.js
  data/cafes.seed.json
  scripts/seed.js
  server.js
frontend/
  src/pages, components, services, utils, App.jsx
```

## Notes

- Seed data covers Colombo 03, 04, 05, 07, Rajagiriya, and Nugegoda.
- UI design from the frontend MVP is preserved; cards/filters now map to the MongoDB amenity fields.
