# Agent Guidelines for Bun + Elysia + Prisma + Supabase

These instructions apply to the entire repo unless a closer AGENTS.md exists.

## 0) Rule Sources

- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` found.
- If any appear later, include them and follow them as higher priority.

## 1) Project Map

- `src/index.ts` — Elysia API routes.
- `prisma/schema.prisma` — Prisma schema + generators.
- `prisma/seed.ts` — seed data.
- `prisma.config.ts` — Prisma 7 config (datasource URL).
- `generated/prisma` — Prisma client output (generated).
- `generated/prismabox` — PrismaBox schemas (generated).
- `.env` — local secrets (do not commit).

## 2) Build/Run Commands

- Install dependencies: `bun install`
- Dev server (watch): `bun run dev`
- Start server: `bun run start`
- Prisma CLI: `bunx prisma`
- Generate client + PrismaBox: `bunx prisma generate`
- Push schema to DB: `bunx prisma db push`
- Seed data: `bun run seed`

## 3) Lint/Format/Test Commands

- Lint: not configured
- Format: not configured
- Tests: not configured
- Single test: not applicable (no test runner)

If you add lint/format/tests, update this section with exact commands, including
how to run a single test.

## 4) Environment Variables

- `DATABASE_URL` — pooling connection (Supabase port 6543)
- `DIRECT_URL` — direct connection (Supabase port 5432)
- `.env` must never be committed.
- URL-encode passwords with special characters.

## 5) Runtime Behavior

- API listens on port `3000` locally.
- Vercel runs `bunx prisma generate` during build (see `vercel.json`).

## 6) TypeScript Conventions

- ESM modules (`"type": "module"` in `package.json`).
- Use `import`/`export` syntax only.
- Keep `strict: true` type safety.
- Avoid `any` unless unavoidable; prefer explicit types.
- Prefer narrow types for request bodies and params.

## 7) Formatting & Style

- Use 2-space indentation.
- Use double quotes for strings.
- Keep semicolons.
- Prefer trailing commas in multi-line objects/arrays.
- Keep lines reasonably short and readable.

## 8) Imports

- Order imports top-to-bottom by external → internal.
- Group related imports together.
- Keep generated imports together (Prisma client + PrismaBox).
- Example order in `src/index.ts`:
  - Elysia
  - Prisma adapter + pg
  - generated Prisma client
  - generated PrismaBox schemas

## 9) Naming Conventions

- Types/interfaces: `PascalCase`.
- Variables/functions: `camelCase`.
- Route paths: kebab-case or resource-based (`/products/:id`).
- Use descriptive names; avoid one-letter identifiers.

## 10) API & Routing Conventions

- Use Elysia route chaining (`.get().post().patch().delete()`).
- Keep route handlers small and readable.
- Prefer consistent response shapes across routes.
- Use `set.status` for errors; return `{ message }` objects.
- Return 404 for missing entities.

## 11) Validation & Schemas

- Use generated PrismaBox schemas for validation.
- Do not hand-write schemas unless required.
- Schema sources:
  - `ProductPlain`
  - `ProductPlainInputCreate`
  - `ProductPlainInputUpdate`

## 12) Prisma Usage

- Use `PrismaClient` from `generated/prisma`.
- Use `PrismaPg` adapter with `pg` pool.
- Do not edit files under `generated/` by hand.
- Regenerate after schema changes: `bunx prisma generate`.

## 13) Prisma Schema Conventions

- Keep schema minimal and aligned with API needs.
- Use `cuid()` for ids.
- Prefer `Decimal?` for optional numeric prices.
- Only change model fields when necessary.

## 14) Data Transformation

- Convert Prisma Decimal to number before returning JSON.
- Keep the `toProductResponse` helper and update as models evolve.

## 15) Error Handling

- Avoid throwing raw errors to clients.
- Use Elysia `set.status` and return a `{ message }` object.
- Catch Prisma update/delete errors for missing records.

## 16) Seeds

- Seed uses `createMany` with `skipDuplicates: true`.
- Keep seed data realistic but small.

## 17) Generated Artifacts

- `generated/prisma` and `generated/prismabox` are build artifacts.
- Regenerate after `schema.prisma` changes.
- Avoid committing local artifacts unless required by deploy flow.

## 18) Common Tasks

- Update schema → run `bunx prisma generate` → `bunx prisma db push`.
- Add route → update validation using PrismaBox schemas.
- Update response shape → update `toProductResponse`.

## 19) Do Not Do

- Do not commit `.env`.
- Do not edit generated folders manually.
- Do not add new tools or configs unless requested.
- Do not change runtime port without user request.

## 20) Documentation Updates

- Update `README.md` when behavior changes.
- Keep setup steps aligned with `.env` requirements.

## 21) Commit Guidance

- Keep commits small and descriptive.
- Avoid committing build artifacts unless required.

## 22) Contact & Ownership

- This repository is maintained by the project owner.
- Coordinate large changes with the owner first.
