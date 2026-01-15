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

## Example Requests (cURL)

Replace `<BASE_URL>` with `http://localhost:3000` or your Vercel URL.

```bash
# Health
curl <BASE_URL>/

# Create
curl -X POST <BASE_URL>/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Gaming Mouse","detail":"RGB mouse","price":89.99}'

# List
curl <BASE_URL>/products

# Get by id
curl <BASE_URL>/products/<PRODUCT_ID>

# Update
curl -X PATCH <BASE_URL>/products/<PRODUCT_ID> \
  -H "Content-Type: application/json" \
  -d '{"price":79.99}'

# Delete
curl -X DELETE <BASE_URL>/products/<PRODUCT_ID>
```

## Example Requests (PowerShell)

```powershell
# Create
Invoke-RestMethod -Uri <BASE_URL>/products -Method POST -ContentType "application/json" -Body '{"name":"Gaming Mouse","detail":"RGB mouse","price":89.99}'

# List
Invoke-RestMethod -Uri <BASE_URL>/products -Method GET

# Get by id
Invoke-RestMethod -Uri <BASE_URL>/products/<PRODUCT_ID> -Method GET

# Update
Invoke-RestMethod -Uri <BASE_URL>/products/<PRODUCT_ID> -Method PATCH -ContentType "application/json" -Body '{"price":79.99}'

# Delete
Invoke-RestMethod -Uri <BASE_URL>/products/<PRODUCT_ID> -Method DELETE
```

## Deploy (Vercel)

- Set Vercel Environment Variables:
  - `DATABASE_URL` (pooling, port 6543)
  - `DIRECT_URL` (direct, port 5432)
- `vercel.json` uses Bun runtime and runs `bunx prisma generate` during build.
