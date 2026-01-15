# Bun + Elysia + Prisma + Supabase API

CRUD API built with Bun, Elysia, Prisma 7, PrismaBox, and Supabase PostgreSQL.

## Prerequisites

- Bun installed
- Supabase project (Postgres)

## Setup

1. Install dependencies:

```bash
bun install
```

2. Create `.env` (do not commit it):

```env
# Connection pooling (runtime)
DATABASE_URL="postgresql://postgres.<project-id>:<password>@aws-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection (migrations/db push)
DIRECT_URL="postgresql://postgres.<project-id>:<password>@aws-<region>.pooler.supabase.com:5432/postgres"
```

> If your password has special characters, URL-encode it.

3. Generate Prisma client + PrismaBox:

```bash
bunx prisma generate
```

4. Push schema to Supabase:

```bash
bunx prisma db push
```

5. (Optional) Seed sample data:

```bash
bun run seed
```

## Run locally

```bash
bun run dev
```

Server starts at `http://localhost:3000`.

## API Endpoints

- `GET /` — health check
- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`

## Deploy (Vercel)

- Set Vercel Environment Variables:
  - `DATABASE_URL` (pooling, port 6543)
  - `DIRECT_URL` (direct, port 5432)
- `vercel.json` uses Bun runtime and runs `bunx prisma generate` during build.
