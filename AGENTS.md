# AGENTS.md — PaalStack Next.js Starter

Entry point for AI coding agents (Cursor, Claude Code, Copilot, Codex, etc.) working in this repository.

## What this project is

A production-ready **Next.js 16 App Router** starter template (React 19, TypeScript strict, Tailwind CSS v4) that **consumes** the `@paalstack/react-ui` design system. It is the base template for all new PaalStack applications (SaaS, enterprise dashboards, admin panels, AI-powered apps).

## Read these first

- `.cursor/rules/paalstack.mdc` — the authoritative project conventions (imports, structure, data layer, forms, errors, styling). Follow it for every change.
- `.cursor/rules/commit-message.mdc` — commit message format (enforced by commitlint).
- `README.md` — setup, env vars, and feature guides.

## Critical: this is NOT the Next.js you know

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Golden rules

1. **Consume, don't author.** `@paalstack/react-ui` already provides Button, Card, Form, Dialog, DataTable, Select, Tabs, Toast, etc. Search it before creating any UI. Never duplicate components or hooks the library already ships.
2. **No native HTML in JSX.** Use `Box` (with `as`), `TypographyH1..H6`, `TypographyP`, `Button`, etc. from `@paalstack/react-ui`.
3. **Icons from sub-paths.** `import { LuX } from '@paalstack/react-icons/lu'` — never from the root barrel, never install icon packages directly.
4. **Semantic tokens only.** `bg-primary`, `text-muted-foreground` — no raw hex.
5. **Follow the folder pattern.** `src/apis/`, `src/services/`, `src/hooks/queries|mutations/`, `src/schemas/`, `src/features/`, `src/components/`, `src/libs/`. Each module: `implementation.ts` + `index.ts` barrel.
6. **Server state → TanStack Query. Client state → Zustand.** Don't mix them.
7. **Forms → react-hook-form + zod + @hookform/resolvers.**
8. **Errors → the typed `AppErrorBase` hierarchy** + `withApiErrorHandling` / `apiSuccess` / `apiError` in route handlers.
9. **Env → `@t3-oss/env-nextjs`** in `src/libs/env/env.ts`. Never read `process.env` directly.
10. **`'use client'` only when needed.** Layout, typography, and most UI are Server Components.

## Verification

Before finishing any change, run:

- `pnpm type-check`
- `pnpm lint`
- `pnpm test` (Vitest) and `pnpm test:e2e` (Playwright) where relevant
- `pnpm build` for a full production check

## Commits

Conventional Commits, enforced by commitlint. See `.cursor/rules/commit-message.mdc`.
