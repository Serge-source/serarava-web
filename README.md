# Serava Retreats — Website

Boutique vacation-rental website for Serava Retreats near Eagle Beach, Aruba.
Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **PostgreSQL + Prisma 7**.

---

## Table of contents

1. [Quick start (local dev)](#1-quick-start-local-dev)
2. [Environment variables](#2-environment-variables)
3. [Database seeding](#3-database-seeding)
4. [Adding photos](#4-adding-photos)
5. [Running tests](#5-running-tests)
6. [Deployment — Vercel](#6-deployment--vercel)
7. [Deployment — VPS with Docker](#7-deployment--vps-with-docker)
8. [Project structure](#8-project-structure)

---

## 1. Quick start (local dev)

**Prerequisites:** Node.js ≥ 20, npm ≥ 10

```bash
# Clone and install
git clone <repo-url> serava-web
cd serava-web
npm install

# Copy the env template and fill in values
cp .env.example .env.local

# Start the development server
npm run dev
```

The site will be available at **http://localhost:3000**.

The admin dashboard is at **http://localhost:3000/admin**.
On first run without a database, sign in with the env-var credentials:
- Email: value of `SEED_OWNER_EMAIL`
- Password: value of `SEED_OWNER_PASSWORD`

---

## 2. Environment variables

Copy `.env.example` to `.env.local` for local development (never commit `.env.local`).

| Variable | Required | Description |
|---|---|---|
| `AUTH_SECRET` | **Yes** | Random 32-byte hex string for NextAuth JWT signing. Generate: `openssl rand -hex 32` |
| `NEXTAUTH_URL` | Dev only | Full public URL of the site, e.g. `http://localhost:3000`. Not needed on Vercel. |
| `SEED_OWNER_EMAIL` | **Yes** | Email address of the initial owner account (used as fallback when no DB). |
| `SEED_OWNER_PASSWORD` | **Yes** | Password for the initial owner account (plain text, only used as a dev fallback; production uses bcrypt from DB). |
| `SEED_OWNER_NAME` | No | Display name for the initial owner, e.g. `Property Owner`. Defaults to `"Owner"`. |
| `DATABASE_URL` | Prod | PostgreSQL connection string, e.g. `postgresql://user:pass@host:5432/serava`. Without this, the site runs from seed data only. |
| `RESEND_API_KEY` | No | API key from [resend.com](https://resend.com) to enable contact-form email delivery. |
| `NOTIFY_EMAIL` | No | Email address to forward contact-form submissions to. Required when `RESEND_API_KEY` is set. |
| `SMTP_HOST` | No | Alternative: SMTP server host (install `nodemailer` separately; see `lib/email.ts`). |
| `SMTP_PORT` | No | SMTP port. Defaults to `587`. |
| `SMTP_USER` | No | SMTP username. |
| `SMTP_PASS` | No | SMTP password. |
| `SMTP_FROM` | No | SMTP from address, e.g. `noreply@seravaretreats.com`. |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID, e.g. `G-XXXXXXXXXX`. |

---

## 3. Database seeding

A PostgreSQL database is **optional for local development** — the site runs entirely from `content/seed.ts` without one. For full content management (messages, media uploads, user management), you need a database.

```bash
# 1. Start a local Postgres instance (or use Docker)
docker run -d --name serava-db \
  -e POSTGRES_DB=serava \
  -e POSTGRES_USER=serava \
  -e POSTGRES_PASSWORD=serava \
  -p 5432:5432 postgres:16-alpine

# 2. Set DATABASE_URL in .env.local
# DATABASE_URL="postgresql://serava:serava@localhost:5432/serava"

# 3. Apply the schema
npx prisma migrate deploy

# 4. Generate the Prisma client
npx prisma generate

# 5. Seed initial data (creates the Owner account from SEED_OWNER_* env vars)
npm run db:seed
```

After seeding, restart the dev server and sign in with the credentials you set.

---

## 4. Adding photos

In development without a database, photos are served as placeholder blocks.

Once the database and admin are set up:
1. Go to **Admin → Gallery**.
2. Click **Add photo**, upload from your device.
3. Add a caption and select the category (Property, Studios, Suites, Villa, Swimming Pool, Outdoor Areas).
4. Click **Save** — the gallery and all pages that reference the photo update immediately via on-demand revalidation.

Photo storage uses the local filesystem in development. For production on a VPS, mount a persistent volume at `/app/public/uploads/`. On Vercel or any ephemeral filesystem, configure an S3-compatible object store and implement the storage adapter in `lib/storage.ts` (interface is defined there; local-disk adapter is the default).

---

## 5. Running tests

```bash
# Unit tests (Vitest)
npm test

# Unit tests in watch mode
npm run test:watch

# End-to-end tests (Playwright — requires dev server running)
npm run test:e2e

# Responsive screenshots only (saves to docs/screenshots/)
npm run test:screenshots
```

Screenshots are saved to `docs/screenshots/` as `mobile_<page>.png` (375 px) and `desktop_<page>.png` (1440 px).

---

## 6. Deployment — Vercel

1. Push the repository to GitHub / GitLab.
2. Import the project in [vercel.com](https://vercel.com).
3. Add all environment variables from Section 2 in the Vercel project settings.
4. Deploy. Next.js is detected automatically; no build configuration needed.

**Database:** Provision a PostgreSQL instance (Vercel Postgres, Neon, Supabase, Railway, etc.), copy the connection string to `DATABASE_URL`, and run migrations:

```bash
# From your local machine with DATABASE_URL pointing to production
npx prisma migrate deploy
npx prisma generate
npm run db:seed
```

---

## 7. Deployment — VPS with Docker

A `Dockerfile` and `docker-compose.yml` are included for self-hosted deployments.

```bash
# 1. Copy the env template on the server
cp .env.example .env.production
# Fill in all variables, especially DATABASE_URL pointing to the postgres service

# 2. Build and start
docker compose up -d

# 3. First-time: run migrations and seed
docker compose exec web npx prisma migrate deploy
docker compose exec web npx prisma generate
docker compose exec web npm run db:seed
```

The `docker-compose.yml` starts:
- **web** — Next.js app on port 3000
- **db** — PostgreSQL 16 with a named volume for persistence

Reverse-proxy with **nginx** or **Caddy** to terminate HTTPS and forward to port 3000.

**Example Caddy config:**
```
seravaretreats.com {
  reverse_proxy localhost:3000
}
```

---

## 8. Project structure

```
serava-web/
├── app/                    # Next.js App Router pages and API routes
│   ├── (public pages)      # /, /accommodations, /amenities, /gallery, etc.
│   ├── admin/              # Admin dashboard
│   │   ├── (protected)/    # Authenticated sections (layout checks session)
│   │   └── login/          # Public login page
│   └── api/                # API routes (contact, auth, admin/revalidate)
├── components/             # Shared UI components (SiteNav, SiteFooter, ImageSlot)
├── content/
│   └── seed.ts             # Single source of truth for all site content
├── lib/
│   ├── db.ts               # Prisma singleton
│   └── email.ts            # Email delivery adapter (Resend / SMTP)
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding script
├── auth.ts                 # NextAuth v5 configuration
├── proxy.ts                # Route protection (Next.js 16 proxy convention)
├── tests/
│   ├── unit/               # Vitest unit tests
│   └── e2e/                # Playwright end-to-end and screenshot tests
├── docs/
│   └── screenshots/        # Responsive screenshots (generated by test:screenshots)
├── .env.example            # Environment variable template
├── Dockerfile
└── docker-compose.yml
```

---

## Placeholder values

The following values in `content/seed.ts` are marked `PLACEHOLDER` and should be updated via **Admin → Integrations** once confirmed:

- Property email address
- Phone number
- WhatsApp URL
- Check-in / check-out times (shown on accommodation pages)
- Instagram and Facebook URLs
- Google Maps embed URL

These appear in the admin **Dashboard → Launch checklist** as items needing attention.
