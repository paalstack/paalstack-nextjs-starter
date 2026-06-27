# PaalStack Next.js Starter

> The official production-ready Next.js starter template for all PaalStack applications.

[![CI](https://github.com/paalamugan/paalstack-nextjs-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/paalamugan/paalstack-nextjs-starter/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E)](https://supabase.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

---

## Overview

`paalstack-nextjs-starter` is an opinionated, production-grade Next.js 16 starter template designed for building:

- **SaaS applications**
- **Enterprise dashboards and internal tools**
- **Admin panels**
- **AI-powered web applications**
- **Customer-facing products**

It bundles a battle-tested set of libraries, strict linting, testing infrastructure, CI/CD pipelines, and environment validation — so you can skip setup and start shipping features on day one.

---

## Features

- **Next.js 16 App Router** with Server Components, Streaming, and Route Handlers
- **React 19** — latest concurrent features and Server Actions
- **TypeScript** strict mode with zero compromises
- **Tailwind CSS v4** + `@paalstack/react-ui` design system integration
- **TanStack Query v5** for server state management with DevTools
- **Zustand v5** for client state with persistence and DevTools
- **Zod v4** + `@t3-oss/env-nextjs` for runtime environment validation
- **Axios** pre-configured with interceptors, auth token hooks, and typed responses
- **react-hook-form** + Zod resolver for form handling
- **Vitest** + React Testing Library for unit and integration tests (80% coverage enforced)
- **Playwright** for end-to-end browser testing
- **ESLint v9** flat config with TypeScript strict rules
- **Prettier** with Tailwind class sorting
- **Husky** + **lint-staged** + **commitlint** (Conventional Commits)
- **Supabase** — Auth, PostgreSQL database, and Row Level Security out of the box
- **Route protection** via `proxy.ts` — redirect to login / dashboard based on session state
- **GitHub Actions** CI/CD with type-check, lint, test, and build

---

## Tech Stack

| Category        | Library                               |
| --------------- | ------------------------------------- |
| Framework       | Next.js 16 (App Router)               |
| UI              | React 19                              |
| Language        | TypeScript 5.6                        |
| Styling         | Tailwind CSS v4 + @paalstack/react-ui |
| Auth & Database | Supabase (Auth + PostgreSQL + RLS)    |
| Server State    | TanStack Query v5                     |
| Client State    | Zustand v5                            |
| Forms           | react-hook-form + Zod                 |
| HTTP Client     | Axios                                 |
| Env Validation  | @t3-oss/env-nextjs + Zod              |
| Unit Tests      | Vitest + React Testing Library        |
| E2E Tests       | Playwright                            |
| Linting         | ESLint v9 (flat config)               |
| Formatting      | Prettier                              |
| Git Hooks       | Husky + lint-staged + commitlint      |
| Package Manager | pnpm                                  |

---

## Installation

### Prerequisites

- Node.js ≥ 22
- pnpm ≥ 10

### Clone and install

```bash
# Clone the repository
git clone https://github.com/paalamugan/paalstack-nextjs-starter.git my-app
cd my-app

# Install dependencies
pnpm install

# Copy and configure environment variables
cp .env.example .env.local
```

### Configure environment variables

Edit `.env.local`:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Your App"

# Supabase — get from https://supabase.com/dashboard/project/<id>/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...

# Backend API
NEXT_PUBLIC_API_BASE_URL=https://api.yourapp.com/v1
```

### Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

All variables are validated at startup using `@t3-oss/env-nextjs` + Zod. Misconfigured deployments fail immediately with a clear error.

### Client-side (exposed to browser)

| Variable                               | Required | Default                 | Description                     |
| -------------------------------------- | -------- | ----------------------- | ------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Yes      | —                       | Supabase project URL            |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes      | —                       | Supabase publishable (anon) key |
| `NEXT_PUBLIC_APP_URL`                  | No       | `http://localhost:3000` | Public app URL                  |
| `NEXT_PUBLIC_APP_NAME`                 | No       | `PaalStack`             | Application display name        |
| `NEXT_PUBLIC_API_BASE_URL`             | Yes      | —                       | Backend API base URL            |
| `NEXT_PUBLIC_DEBUG_MODE`               | No       | `false`                 | Enable verbose browser logging  |

### Server-only (never exposed to browser)

| Variable                | Required | Description                                                       |
| ----------------------- | -------- | ----------------------------------------------------------------- |
| `SUPABASE_SECRET_KEY`   | Yes\*    | Supabase secret key — bypasses RLS. Required for admin operations |
| `SUPABASE_ACCESS_TOKEN` | No       | Personal access token for migration scripts only                  |

> Get Supabase keys from **Project → Settings → API**. Get access token from [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens).

Add additional variables to `src/libs/env/env.ts` — they are validated automatically.

---

## Folder Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout (fonts, providers, metadata)
│   ├── page.tsx          # Home page (Server Component)
│   ├── loading.tsx       # Global Suspense fallback
│   ├── error.tsx         # Global error boundary
│   ├── not-found.tsx     # 404 page
│   ├── about/
│   │   └── page.tsx      # About page
│   └── api/
│       └── health/
│           └── route.ts  # Health check API route
│
├── actions/              # Server Actions
├── apis/
│   ├── client/           # Axios instance with interceptors
│   └── example/          # Example API service module
│
├── components/
│   └── ExampleCard/      # Reusable card component
│
├── constants/
│   └── routes/           # Route constant definitions
│
├── features/
│   └── auth/             # Auth scaffold (plug in your provider)
│       ├── README.md
│       ├── index.ts
│       ├── types.ts
│       └── hooks/
│           └── useAuth.ts
│
├── hooks/
│   ├── mutations/        # TanStack Query mutation hooks
│   ├── queries/          # TanStack Query query hooks
│   └── useAppStore/      # Zustand store hook re-export
│
├── libs/
│   ├── env/              # @t3-oss/env-nextjs configuration
│   ├── query-client/     # QueryClient singleton
│   └── supabase/         # Supabase client factory
│       ├── browser.ts    # createBrowserSupabaseClient() — Client Components
│       ├── server.ts     # createServerSupabaseClient() — RSC / Server Actions
│       ├── middleware.ts # createMiddlewareSupabaseClient() — proxy.ts
│       ├── auth.ts       # requireAuth() + ensureProfile()
│       └── index.ts      # Re-exports
│
├── providers/
│   ├── query-provider.tsx
│   ├── theme-provider.tsx
│   └── index.ts          # Combined <Providers> wrapper
│
├── schemas/
│   └── example/          # Zod form schema example
│
├── services/
│   └── api/              # Business-logic service layer
│
├── stores/
│   └── app/              # Zustand app store (persist + devtools)
│
├── styles/
│   └── globals.css       # Tailwind v4 + @paalstack/react-ui theme
│
├── test/
│   ├── setup.ts          # Vitest setup (jest-dom, mocks)
│   ├── test-utils.tsx    # render + renderWithProviders helpers
│   └── e2e/
│       └── home.spec.ts  # Playwright smoke tests
│
├── types/
│   └── app/              # Shared TypeScript types
│
└── utils/
    ├── cn/               # cn() utility (clsx + tailwind-merge)
    ├── helper/           # General-purpose helpers
    └── logger/           # Debug-gated logger

proxy.ts                  # Route protection (session refresh + auth redirects)
```

---

## Development Workflow

```bash
pnpm dev          # Start development server (Turbopack)
pnpm build        # Production build
pnpm start        # Start production server
pnpm analyze      # Build + open Turbopack bundle analyzer in browser
pnpm type-check   # TypeScript type checking
pnpm lint         # ESLint
pnpm lint:fix     # ESLint with auto-fix
pnpm format       # Prettier write
pnpm format:check # Prettier check
```

### Bundle analysis

`pnpm analyze` runs `next experimental-analyze` — the built-in Turbopack bundle analyzer. It produces an interactive treemap showing every module and its contribution to the final bundle, broken down by route. Use it to spot unexpectedly large dependencies or code that should be lazy-loaded.

---

## Testing

### Unit tests (Vitest + RTL)

```bash
pnpm test              # Run all unit tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report (80% threshold enforced)
pnpm test:ui           # Vitest UI
```

Tests live co-located with source files as `*.test.ts(x)`. Setup in `src/test/setup.ts`.

### End-to-end tests (Playwright)

```bash
pnpm test:e2e          # Run E2E tests against localhost:3000
pnpm test:e2e:ui       # Playwright UI mode
```

E2E specs live in `src/test/e2e/`. The web server is started automatically.

---

## Deployment

### Vercel (recommended)

The starter ships with a `vercel.yml` GitHub Actions workflow that handles deployments automatically:

| Trigger                  | Action                                         |
| ------------------------ | ---------------------------------------------- |
| Push to `main`           | Production deploy                              |
| PR to `main` / `develop` | Preview deploy + posts the URL as a PR comment |

#### One-time setup

**Step 1 — Link your project locally**

```bash
# Install Vercel CLI
pnpm add -g vercel

# Authenticate and link the repo (creates .vercel/project.json)
vercel link
```

**Step 2 — Copy the IDs from `.vercel/project.json`**

```json
{
  "orgId": "team_xxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxx"
}
```

**Step 3 — Add three secrets to GitHub → Settings → Secrets → Actions**

| Secret              | Where to get it                                                |
| ------------------- | -------------------------------------------------------------- |
| `VERCEL_TOKEN`      | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID`     | `"orgId"` from `.vercel/project.json`                          |
| `VERCEL_PROJECT_ID` | `"projectId"` from `.vercel/project.json`                      |

**Step 4 — Set environment variables in the Vercel dashboard**

Go to **Project → Settings → Environment Variables** and add the same variables from your `.env.local`.

> Works for both personal (Hobby — free) and organization (Pro) Vercel accounts. The workflow code is identical for both.

### Docker

A production-ready `Dockerfile` and `docker-compose.yml` are included. `output: 'standalone'` is already enabled in `next.config.ts`.

```bash
# Build and start with Docker Compose
docker compose up --build

# Build image manually
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://<id>.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_... \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.example.com/v1 \
  -t paalstack-nextjs-starter .

# Run container
docker run -p 3000:3000 \
  -e SUPABASE_SECRET_KEY=sb_secret_... \
  paalstack-nextjs-starter
```

**Important:** `NEXT_PUBLIC_*` vars are baked into the client bundle at build time — pass them as `--build-arg`. Server-only secrets (`SUPABASE_SECRET_KEY`, `SUPABASE_ACCESS_TOKEN`) are injected at runtime via environment variables and are never baked into the image.

### Other platforms

- **Netlify** — use the Next.js runtime plugin
- **Railway** — connect repo, set env vars, deploy
- **Render** — use the Node.js environment with `pnpm build && pnpm start`

---

## CI/CD

Three workflows ship with the starter:

| Workflow      | Trigger                                   | Jobs                                                    |
| ------------- | ----------------------------------------- | ------------------------------------------------------- |
| `ci.yml`      | Push to `develop`, PR to `main`/`develop` | type-check → lint → test → build                        |
| `vercel.yml`  | Push to `main`, PR to `main`/`develop`    | deploy to Vercel (production or preview)                |
| `release.yml` | Manual dispatch                           | type-check → lint → test → build → tag → GitHub Release |

> `ci.yml` must pass on a PR before it can be merged to `main`. `vercel.yml` then deploys automatically on merge.

---

## Authentication

Supabase Auth integration is **included but disabled by default**. The starter runs without any Supabase credentials — no errors, no redirects. Enable it when you're ready.

---

### Enabling Supabase

Follow these steps in order:

#### 1. Set environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
```

Get keys from **Supabase Dashboard → Project → Settings → API**.

#### 2. Uncomment env validation (`src/libs/env/env.ts`)

```ts
server: {
  SUPABASE_SECRET_KEY: z.string().min(1).optional(),
  SUPABASE_ACCESS_TOKEN: z.string().min(1).optional(),
},
client: {
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
},
runtimeEnv: {
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  SUPABASE_ACCESS_TOKEN: process.env.SUPABASE_ACCESS_TOKEN,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
},
```

#### 3. Enable session refresh + route protection (`src/proxy.ts`)

Uncomment the import and replace the function body as shown in the comments inside the file. The guard enforces:

| Route          | Unauthenticated | Authenticated  |
| -------------- | --------------- | -------------- |
| `/`            | → `/auth/login` | → `/dashboard` |
| `/dashboard/*` | → `/auth/login` | allowed        |
| `/auth/*`      | allowed         | → `/dashboard` |

#### 4. Done — use the Supabase clients

```ts
// Client Component
import { createBrowserSupabaseClient } from '@/libs/supabase';
const supabase = createBrowserSupabaseClient();
await supabase.auth.signInWithPassword({ email, password });

// Server Component / RSC
import { createServerSupabaseClient } from '@/libs/supabase';
const supabase = await createServerSupabaseClient();
const { data } = await supabase.from('profiles').select('*');

// Server Action / Route Handler (with auth guard)
import { requireAuth } from '@/libs/supabase';
const { supabase, user, error } = await requireAuth();
if (error) return NextResponse.json({ error }, { status: 401 });
```

### `requireAuth()`

Resolves the current session and upserts a `profiles` row (required as FK target for `user_id` / `owner_id`). Use exclusively in Server Actions and Route Handlers.

---

See [`src/features/auth/README.md`](./src/features/auth/README.md) for guides on swapping to an alternative provider (NextAuth.js v5, Clerk, Auth0, AWS Cognito).

---

## Coding Standards

### Commit messages

Conventional Commits enforced via commitlint:

```
feat: add user authentication
fix: resolve env validation failure on empty string
chore: update dependencies
docs: improve auth scaffold README
```

### Component conventions

- Server Components by default — add `'use client'` only when needed
- Components: `component.tsx` + `index.ts` barrel
- Hooks: `hook.ts` + `index.ts` barrel
- API modules: `api.ts` + `type.ts` + `index.ts`
- Co-locate tests: `*.test.ts(x)` next to the source file

### Import order

Imports are automatically sorted by ESLint:

1. Built-in Node.js modules
2. External packages
3. Internal `@/*` aliases
4. Parent / sibling / index
5. Type-only imports

---

## PaalStack Packages

| Package                  | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| `@paalstack/react-ui`    | Component library (Cards, Headings, Grids, etc.) |
| `@paalstack/react-hooks` | Shared React hooks                               |
| `@paalstack/react-icons` | Icon set                                         |

Import and use throughout components:

```tsx
import { Card, CardContent, Heading } from '@paalstack/react-ui';
```

Styles and theme tokens are imported in `src/styles/globals.css`.

---

## Best Practices

- **Server Components first** — fetch data on the server, push interactivity to Client Components
- **Validated environment** — never access `process.env` directly; use `env` from `@/libs/env`
- **Typed API layer** — all axios calls go through `@/apis/client` with typed responses
- **Co-located tests** — tests live next to the code they test
- **Atomic commits** — one logical change per commit, Conventional Commits format
- **No `any`** — TypeScript strict mode with `no-explicit-any: error`

---

## License

MIT — see [LICENSE](./LICENSE).
