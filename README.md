# PaalStack Next.js Starter

> The official production-ready Next.js starter template for all PaalStack applications.

[![CI](https://github.com/paalstack/paalstack-nextjs-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/paalstack/paalstack-nextjs-starter/actions/workflows/ci.yml)
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
- **Drizzle ORM** — type-safe PostgreSQL ORM with migration tooling (optional)
- **Sentry** — error monitoring and performance tracing for browser, server, and edge (optional)
- **PostHog** — product analytics with ad-blocker-safe reverse proxy (optional)
- **Resend** — email delivery (optional, dependency pre-installed)
- **Typed error system** — `AppErrorBase` hierarchy with HTTP status mapping, `withApiErrorHandling` wrapper
- **Structured logger** — leveled logging with ISO timestamps and JSON context
- **Rate limiter** — in-memory sliding-window for auth-flow protection
- **Shared UI components** — `EmptyState`, `LoadingState`, `PageHeader`, `StatCard`, `AppErrorBoundary`, `ConfirmDialog`
- **Security headers** — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Vitest** + React Testing Library for unit and integration tests
- **Playwright** for end-to-end browser testing
- **ESLint v9** flat config with TypeScript strict rules
- **Prettier** with Tailwind class sorting
- **Husky** + **lint-staged** + **commitlint** (Conventional Commits)
- **Supabase** — Auth, PostgreSQL database, and Row Level Security (optional, disabled by default)
- **Route protection** via `proxy.ts` — redirect to login / dashboard based on session state
- **GitHub Actions** CI/CD with type-check, lint, test, and build
- **Docker** — multi-stage Dockerfile with standalone output, docker-compose for local dev
- **Vercel** — one-click deploy config with `vercel.json`

---

## Tech Stack

| Category         | Library                                     |
| ---------------- | ------------------------------------------- |
| Framework        | Next.js 16 (App Router)                     |
| UI               | React 19                                    |
| Language         | TypeScript 5.6                              |
| Styling          | Tailwind CSS v4 + @paalstack/react-ui       |
| Auth & Database  | Supabase (Auth + PostgreSQL + RLS) optional |
| ORM              | Drizzle ORM (optional)                      |
| Server State     | TanStack Query v5                           |
| Client State     | Zustand v5                                  |
| Forms            | react-hook-form + Zod                       |
| HTTP Client      | Axios                                       |
| Env Validation   | @t3-oss/env-nextjs + Zod                    |
| Error Monitoring | Sentry (optional)                           |
| Analytics        | PostHog (optional)                          |
| Email            | Resend (optional)                           |
| Unit Tests       | Vitest + React Testing Library              |
| E2E Tests        | Playwright                                  |
| Linting          | ESLint v9 (flat config)                     |
| Formatting       | Prettier                                    |
| Git Hooks        | Husky + lint-staged + commitlint            |
| Package Manager  | pnpm                                        |

---

## Installation

### Prerequisites

- Node.js ≥ 22
- pnpm ≥ 10

### Clone and install

```bash
# Clone the repository
git clone https://github.com/paalstack/paalstack-nextjs-starter.git my-app
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

`pnpm analyze` runs `ANALYZE=true next build` — the bundle analyzer opens an interactive treemap showing every module and its contribution to the final bundle, broken down by route. Use it to spot unexpectedly large dependencies or code that should be lazy-loaded.

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

> Playwright E2E specs under `src/test/e2e/` are excluded from the Vitest run
> (see `vitest.config.ts`) so the unit and E2E suites stay separate.

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

## Drizzle ORM

Drizzle ORM is included but disabled by default. The schema file is at `src/libs/db/schema/index.ts` and the client at `src/libs/db/index.ts`.

### Enabling Drizzle

1. Uncomment `DATABASE_URL` in `src/libs/env/env.ts` (both `server` and `runtimeEnv` sections)
2. Add `DATABASE_URL` to `.env.local`
3. Define your tables in `src/libs/db/schema/index.ts`
4. Run `pnpm db:generate` to create migrations, then `pnpm db:migrate` to apply them

```bash
pnpm db:generate    # generate SQL migration from schema changes
pnpm db:migrate     # apply migrations to the database
pnpm db:push        # push schema directly (dev only, no migration files)
pnpm db:studio      # open Drizzle Studio GUI
```

---

## Sentry

Error monitoring via Sentry is optional and no-ops entirely when `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` are unset.

### Enabling Sentry

1. Set `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN` in `.env.local`
2. Optionally set `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` for source map uploads in CI

Sentry is initialized in `src/instrumentation.ts` (server/edge) and `src/instrumentation-client.ts` (browser). Error pages (`error.tsx`, `global-error.tsx`) automatically capture exceptions.

---

## PostHog

Product analytics via PostHog is optional and no-ops when `NEXT_PUBLIC_POSTHOG_KEY` is unset.

### Enabling PostHog

1. Set `POSTHOG_KEY` (server) and `NEXT_PUBLIC_POSTHOG_KEY` (client) in `.env.local`
2. Optionally set `POSTHOG_HOST` / `NEXT_PUBLIC_POSTHOG_HOST` (defaults to `https://us.i.posthog.com`)

PostHog ingest is reverse-proxied through `/ingest` so ad blockers don't drop analytics requests. Pageviews are captured manually via `PostHogPageView` component.

Use the type-safe analytics client:

```ts
import { track, identify } from '@/libs/analytics';

track('signup_completed', { userId: '123' });
identify('123', { email: 'user@example.com' });
```

Add new events to `src/libs/analytics/events.ts` first — every call site is type-checked against this catalogue.

---

## Error Handling

The starter includes a typed error system in `src/libs/error/error.ts`:

```ts
import { UnauthorizedError, NotFoundError, ValidationError } from '@/libs/error';

throw new UnauthorizedError();
throw new NotFoundError('Account');
throw new ValidationError('Invalid email', { field: 'email' });
```

Each error maps to an HTTP status code. Use `withApiErrorHandling` to wrap Route Handlers:

```ts
import { withApiErrorHandling, apiSuccess } from '@/libs/api';
import { UnauthorizedError } from '@/libs/error';

export const GET = withApiErrorHandling(async (request: NextRequest) => {
  if (!user) throw new UnauthorizedError();
  return apiSuccess(await listItems());
});
```

---

## Logger

Structured logger in `src/libs/logger/logger.ts`:

```ts
import { logger } from '@/libs/logger';

logger.debug('Cache miss', { key: 'user-123' });
logger.info('Server started', { port: 3000 });
logger.warn('Rate limit approaching', { remaining: 2 });
logger.error('Database query failed', { table: 'users', error: err.message });
```

Debug and info logs are suppressed in production. Warn and error always log.

---

## Rate Limiting

In-memory sliding-window rate limiter in `src/libs/rate-limit/rate-limit.ts`:

```ts
import { checkRateLimit, AUTH_RATE_LIMITS } from '@/libs/rate-limit';

const result = checkRateLimit(
  `login:${ip}`,
  AUTH_RATE_LIMITS.login.limit,
  AUTH_RATE_LIMITS.login.windowMs
);
if (!result.allowed) {
  return new Response('Too many requests', { status: 429 });
}
```

For multi-instance production, swap this for Upstash Redis + `@upstash/ratelimit` without changing call sites.

---

## RBAC + ABAC (Role & Attribute-Based Access Control)

The starter includes a complete access control system in `src/libs/rbac/` that combines:

- **RBAC** — role-to-permission mapping with hierarchical roles (admin > manager > member > viewer > guest)
- **ABAC** — policy engine for context-aware decisions (ownership, time, environment, custom attributes)

### Roles & Permissions

Roles are defined in `src/libs/rbac/permissions.ts`. Each role maps to a set of permissions using the `<resource>:<action>` convention. The `manage` action is a wildcard — `user:manage` grants all actions on the `user` resource.

Add new permissions to the `PERMISSIONS` array, then map them to roles in `ROLE_PERMISSIONS`.

### Server-Side Guards

Use in Server Actions and Route Handlers:

```ts
import { requireRole, requirePermission, requirePolicy, can } from '@/libs/rbac';
import { ownerOnlyRule } from '@/libs/rbac';

// Role check — throws UnauthorizedError / ForbiddenError
requireRole(user, 'admin');

// Permission check
requirePermission(user, 'billing:manage');

// RBAC + ABAC combined — permission AND policy rules
requirePolicy(
  user,
  'user:update',
  {
    resource: { ownerId: post.authorId },
  },
  [ownerOnlyRule]
);

// Non-throwing check
if (can(user, 'settings:manage')) {
  // show admin settings
}
```

### Client-Side Hooks

```ts
import { useRole, usePermission, useRoleAtLeast, useCanAccess } from '@/libs/rbac';

const role = useRole(); // 'admin' | 'member' | null
const canEdit = usePermission('user:update'); // true/false
const isManager = useRoleAtLeast('manager'); // true/false
const canAccess = useCanAccess(
  'user:update',
  {
    resource: { ownerId: '123' },
  },
  [ownerOnlyRule]
);
```

### Client-Side Components (Hide/Show)

```tsx
import { RoleGate, PermissionGate, Can, AnyPermissionGate, AllPermissionsGate } from '@/libs/rbac';
import { ownerOnlyRule } from '@/libs/rbac';

// Show only for admins
<RoleGate role="admin">
  <AdminPanel />
</RoleGate>

// Show only if user has permission
<PermissionGate permission="billing:manage" fallback={<UpgradePrompt />}>
  <BillingSettings />
</PermissionGate>

// RBAC + ABAC combined
<Can
  permission="user:update"
  rules={[ownerOnlyRule]}
  context={{ resource: { ownerId: post.authorId } }}
>
  <EditButton />
</Can>

// Any of multiple permissions
<AnyPermissionGate permissions={['org:invite', 'org:manage']}>
  <InviteButton />
</AnyPermissionGate>

// All of multiple permissions
<AllPermissionsGate permissions={['billing:view', 'settings:view']}>
  <ReportsTab />
</AllPermissionsGate>
```

### Page-Level Route Protection

Define route guards in `src/proxy.ts` (see the commented example). The `checkRouteAccess` helper redirects unauthenticated users to login and forbidden users to a 403 page:

```ts
import { checkRouteAccess, type RouteGuard } from '@/libs/rbac';

const ROUTE_GUARDS: RouteGuard[] = [
  { path: '/dashboard', permission: 'dashboard:view' },
  { path: '/admin', role: 'admin' },
  { path: '/settings', role: 'manager' },
];

// In proxy.ts:
const accessResponse = checkRouteAccess(request, ROUTE_GUARDS, user);
if (accessResponse) return accessResponse;
```

### ABAC Policy Rules

Reusable rules in `src/libs/rbac/abac.ts`:

| Rule                   | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| `ownerOnlyRule`        | Allow only if subject.id === resource.ownerId          |
| `roleRule(role)`       | Allow only if subject has the given role               |
| `permissionRule(perm)` | Allow only if subject has the permission (RBAC bridge) |
| `businessHoursRule`    | Allow only during 9-18, Mon-Fri                        |

Write custom rules:

```ts
import { type PolicyRule } from '@/libs/rbac';

const premiumOnlyRule: PolicyRule = {
  name: 'premium-only',
  evaluate: (ctx) => {
    if (!ctx.environment?.tenantId) return null;
    return ctx.environment.tenantId === 'premium';
  },
};
```

> **Important**: Client-side gates (RoleGate, PermissionGate, Can) are UI conveniences — they hide actions the user shouldn't see. Always enforce permissions server-side via `requireRole`, `requirePermission`, or `requirePolicy` in Server Actions and Route Handlers.

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
