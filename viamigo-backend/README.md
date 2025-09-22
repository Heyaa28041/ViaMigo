# ViaMigo Backend (Prototype)

This is a scaffolded backend for **ViaMigo** — an AI-powered travel assistant. It's implemented in **Node.js + TypeScript**, uses **Prisma** as ORM for **PostgreSQL**, and provides a rule-based recommendation engine (MVP) along with authentication, destinations, itineraries, groups, and basic search endpoints.

---

## What you get in this archive
- A complete backend project scaffold (TypeScript + Express).
- Prisma schema and a seed script with example data.
- Docker Compose to run Postgres locally for development.
- Example routes for auth, destinations, itineraries, groups, and recommendations.
- Instructions to run locally and with Docker.

---

## Quick start (recommended: Docker + Node 18+ installed)

1. Copy `.env.example` to `.env` and edit variables if needed.
2. Start Postgres with Docker Compose:
   ```bash
   docker-compose up -d
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Generate Prisma client & run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
5. Seed the database (example):
   ```bash
   npm run prisma:seed
   ```
6. Start the server (development):
   ```bash
   npm run dev
   ```
7. API will be at `http://localhost:4000` by default.

---

## Useful scripts (package.json)
- `npm run dev` - run with ts-node-dev for local dev
- `npm run build` - compile to JS
- `npm run start` - run built JS
- `npm run prisma:migrate` - run migrations
- `npm run prisma:seed` - run seed script

---

## Environment variables (.env)
See `.env.example`. Important ones:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - secret for JWT tokens
- `PORT` - port to run server

---

## Notes & Next steps
- The recommendation engine is rule-based (good MVP). Swap in ML models later.
- Add more robust validation, rate limiting, RBAC, and monitoring for production.
- Hook into 3rd-party APIs (Google Maps, Booking, Weather) as needed (offered in the product plan).

Enjoy — this scaffold is ready for further development and integration with your frontend.
