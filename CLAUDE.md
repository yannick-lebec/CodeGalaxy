# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CodeGalaxy is a full-stack interactive HTML/CSS learning platform. Users complete progressive exercises in a browser-based IDE (Monaco Editor) with live preview.

## Commands

### Development (recommended: Docker)
```bash
# Start all services with hot reload
docker compose up --build
```

### Manual development
```bash
# Backend (port 3000)
cd backend && npm install && npm run dev

# Frontend (port 5173, separate terminal)
cd frontend && npm install && npm run dev
```

### Build & Lint
```bash
# Backend
cd backend && npm run build      # Compiles TypeScript → dist/server.js

# Frontend
cd frontend && npm run build     # Vite build + TypeScript check
cd frontend && npm run lint      # ESLint
cd frontend && npm run preview   # Preview production build
```

### Environment
Create a `.env` file at the repo root:
```
DATABASE_URL=postgresql://USER:PASSWORD@HOST.neon.tech/DBNAME?sslmode=require
```

## Architecture

### Stack
- **Frontend**: React 19 + TypeScript + Vite, Monaco Editor, React Router 7
- **Backend**: Express 4 + TypeScript (compiled with tsx/tsc)
- **Database**: PostgreSQL via Neon (cloud), single `exercices` table
- **Docker**: Both services run in Node 20 containers with volume mounts for hot reload

### Data flow
1. Frontend fetches exercise data from backend (`GET /exercices/:slug`)
2. User edits HTML/CSS in Monaco editors (local state in `ExercicePage`)
3. Live preview updates via iframe `srcDoc`
4. Validation runs client-side (string pattern matching)
5. On success, navigates to `next_exercice` slug

### Database schema
```sql
exercices (id, slug, level, title, description, starter_code, starter_css, next_exercice)
```
- `slug`: URL identifier (unique)
- `next_exercice`: slug of the next exercise, or null for the final exercise

### Backend API (`backend/src/server.ts`)
- `GET /exercices` — all exercises
- `GET /exercices/:slug` — single exercise by slug
- Uses parameterized queries (`$1` syntax) for SQL injection protection
- CORS restricted to `localhost:5173`

### Frontend structure
```
src/
├── App.tsx             # Router: / → HomePage, /exercice/:slug → ExercicePage
├── pages/
│   ├── HomePage.tsx    # Landing page
│   └── ExercicePage.tsx # Main IDE page (owns all editor state)
└── componants/         # Note: intentional typo in directory name
    ├── CodeEditor.tsx  # Monaco Editor wrapper
    ├── EditorCard.tsx  # Dual HTML+CSS editors + validation button
    ├── Preview.tsx     # iframe sandbox (sandbox="allow-scripts")
    ├── HeroCard.tsx    # Exercise title/description
    └── Header.tsx      # Navigation bar
```

### CI/CD (`.github/workflows/ci.yml`)
- Triggers on push to `main` and PRs
- **check job**: Node 22, installs deps, builds backend, lints + builds frontend
- **docker job**: Builds Docker images only after check passes
