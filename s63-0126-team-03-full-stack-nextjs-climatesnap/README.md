🌍 ClimateSnap – Climate Data Visualization Dashboard


## 🔍 Code Quality & Consistency (Sprint‑1)

Strict TypeScript prevents runtime bugs by enforcing strong typing and removing unused code.

ESLint enforces best practices and avoids common mistakes.

Prettier ensures consistent formatting across the team.

Pre‑commit hooks stop bad code from entering the repository.

This setup ensures a clean, maintainable, and professional codebase for future sprints.

### 📸 / 🧾 Hook run proof

The captured terminal output from a Husky + lint-staged run is saved at:

- `screenshots/lint-hook-output.txt`
ClimateSnap is a simple full‑stack web application built with Next.js (TypeScript) that visualizes basic climate data such as temperature, air quality, and rainfall for different cities.
The goal of this project is to build a clean, scalable foundation that will be extended in future sprints.

🚀 Tech Stack
Frontend: Next.js (App Router)

Language: TypeScript

Backend: Next.js API Routes

Styling: Default (can be extended later)

Package Manager: npm

📁 Folder Structure
src/
 ├── app/          # Application routes and pages (App Router)
 ├── components/   # Reusable UI components
 ├── lib/          # Utility functions, helpers, configurations
public/
 ├── screenshot.png # Screenshot of the app running locally
📌 Folder Purpose
app/ → Handles routing and page-level components

components/ → Shared and reusable UI components

lib/ → Common utilities and helper logic

public/ → Static assets like images and screenshots

This structure keeps the code modular, readable, and scalable.

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone <repository-url>
cd <repository-name>
2️⃣ Install dependencies
npm install
3️⃣ Run the development server
npm run dev
Open 👉 http://localhost:3000 in your browser.

📸 Screenshot
Below is the application running locally:


## 🔁 GitHub Workflow & Code Review Process

### 🌿 Branching Strategy
We follow a structured branching strategy:
- `feature/*` → new features
- `fix/*` → bug fixes
- `chore/*` → maintenance tasks
- `docs/*` → documentation updates

The `main` branch is protected and always contains stable code.

---

### 🔍 Code Review Checklist
Every Pull Request is reviewed against the following:
- Code follows agreed naming conventions
- Functionality works as expected locally
- No console errors or warnings
- ESLint and Prettier checks pass
- Code is readable and well-documented
- No secrets or sensitive data are exposed

---

### 🧠 Why This Workflow?
This workflow ensures:
- High code quality
- Safe and review-based merges
- Better collaboration and accountability
- Clean commit history
- Faster and safer development at scale

---

## 🐳 Docker & Docker Compose (Local Development)

This project includes a beginner-friendly, production-style Docker setup to run the full stack locally:

- **app** → Next.js application
- **db** → PostgreSQL
- **redis** → Redis

### ✅ Purpose of the Dockerfile

The `Dockerfile` defines how the Next.js app is built and started inside a container:

- Uses **Node.js 20 (Alpine)**
- Installs dependencies
- Runs `npm run build`
- Starts the app with `npm run start`

### ✅ docker-compose services

`docker-compose.yml` runs three containers on one shared bridge network:

- `app` (Next.js) exposed on **http://localhost:3000**
- `db` (PostgreSQL) exposed on **localhost:5432**
- `redis` (Redis) exposed on **localhost:6379**

### 🌐 Networks and Volumes

- **Network:** `localnet` (bridge) so services can reach each other by service name (`db`, `redis`).
- **Volume:** `db_data` persists Postgres data across restarts.

### 🔐 Environment variables

The app container receives the following env vars (configured in `docker-compose.yml`):

- `DATABASE_URL=postgres://postgres:password@db:5432/mydb`
- `REDIS_URL=redis://redis:6379`

### ▶️ Build + Run + Verify

Run everything (from the app folder):

```bash
docker-compose up --build
```

Verify containers are running:

```bash
docker ps
```

Then check:

- App: http://localhost:3000
- Postgres: localhost:5432
- Redis: localhost:6379

### 💡 Why Docker helps ("works on my machine")

Docker standardizes the runtime (Node version + dependencies) and guarantees every team member runs the same stack locally with one command.

### 🧯 Common issues + quick fixes

- **Port conflicts (3000/5432/6379 already used):** stop the other service or change the left-hand port mapping in `docker-compose.yml`.
- **Slow first build:** the first build downloads dependencies; later builds are faster due to Docker layer caching.
- **Build errors after dependency changes:** rebuild cleanly with:

  ```bash
  docker-compose up --build --force-recreate
  ```


## 🗄️ PostgreSQL Schema Design (Sprint‑1)

### Entities
- User: represents system users/admins
- City: represents a city
- ClimateData: stores climate readings per city

### Relationships
- One User → Many ClimateData
- One City → Many ClimateData

### Keys & Constraints
- Primary keys on all tables
- Foreign keys with ON DELETE CASCADE
- Unique constraint on User.email
- Composite unique constraint on City (name + state)
- Indexes on cityId and recordedAt for faster queries

### Normalization
The schema follows 3NF:
- No duplicate city data
- Climate records reference city and user via foreign keys
- No redundant attributes

### Scalability
This design supports:
- Time‑based climate queries
- City‑wise aggregations
- Role‑based data ownership

## 🧬 Prisma ORM Setup (Sprint‑1)

### Why Prisma?
Prisma ORM provides a type‑safe and reliable way to interact with PostgreSQL,
reducing runtime errors and improving developer productivity.

### Setup Steps
- Installed Prisma and initialized configuration
- Defined database models in `schema.prisma`
- Generated Prisma Client
- Initialized a single Prisma client instance for Next.js

### Key Files
- `prisma/schema.prisma` → database schema
- `src/lib/prisma.ts` → Prisma client initialization

### Benefits
- Type‑safe queries
- Auto‑generated client
- Better developer experience
- Consistent database access across the app

### Verification
- Prisma client generated successfully
- Test query executed without errors

---

## 🗄️ Database Migrations & Seed Scripts (Prisma)

This project uses **Prisma Migrate** to keep the PostgreSQL schema reproducible across the team, and a **seed script** to load consistent starter data.

### Prerequisites

1) Ensure Postgres is running locally.

If you use the provided Docker Compose setup, start the DB from the app folder:

```bash
cd s63-0126-team-03-full-stack-nextjs-climatesnap
docker compose up -d db
```

2) Ensure `DATABASE_URL` is set for Prisma (host machine).

If Postgres is exposed on localhost:5432 (default in `docker-compose.yml`), a typical value is:

```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb
```

### Create & Apply Migrations

Create/apply the initial migration (or future schema changes):

```bash
npx prisma migrate dev --name init_schema
```

### Rollback / Reset (Development Only)

To drop the DB, re-apply all migrations, and re-run seed data:

```bash
npx prisma migrate reset
```

⚠️ **Warning:** `migrate reset` is destructive. Use only for local/dev environments.

### Seed the Database (Idempotent)

Seed data lives in `prisma/seed.ts` and is written to be safe to re-run (it uses upserts + existence checks).

Run:

```bash
npx prisma db seed
```

### Verify Seed Data

Open Prisma Studio:

```bash
npx prisma studio
```

### Production Safety Reflection

For production environments, avoid destructive commands like `migrate reset`. Instead:

- Apply schema changes with `prisma migrate deploy`
- Run migrations first in staging
- Take DB backups before applying migrations
- Prefer additive migrations (new columns/tables) and test data migrations carefully


## ⚡ Transactions & Query Optimisation (Sprint‑1)

### Transactions
Used Prisma `$transaction()` to ensure multiple dependent
database operations execute atomically.

### Rollbacks
Transactions are wrapped in try-catch blocks.
On failure, Prisma automatically rolls back changes.

### Query Optimisation
- Avoided over-fetching using `select`
- Used batch inserts with `createMany`
- Implemented pagination with `skip` and `take`

### Indexes
- Index on `cityId` for faster filtering
- Index on `recordedAt` for time-based queries

### Performance
Query logs compared before and after indexing
showed improved execution times.

### Anti-patterns Avoided
- N+1 queries
- Full table scans

### Production Monitoring
Query logs, database monitoring, and alerts
would be used in production environments.
