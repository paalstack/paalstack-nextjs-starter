import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

    // ── Supabase (optional — disabled by default) ──────────────────────────
    // Uncomment when enabling Supabase: see README "Enabling Supabase" section.
    // SUPABASE_SECRET_KEY: z.string().min(1).optional(),
    // SUPABASE_ACCESS_TOKEN: z.string().min(1).optional(),

    // ── Database (Drizzle ORM) ─────────────────────────────────────────────
    // Uncomment when enabling Drizzle: see README "Enabling Drizzle ORM" section.
    // DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL connection string'),

    // ── AI (optional) ───────────────────────────────────────────────────────
    // AI_PROVIDER: z.enum(['openai', 'openrouter', 'nvidia']).optional(),
    // AI_API_KEY: z.string().min(1).optional(),
    // AI_MODEL: z.string().min(1).optional(),
    // AI_BASE_URL: z.url().optional(),

    // ── Email delivery via Resend (optional) ────────────────────────────────
    // RESEND_API_KEY: z.string().min(1).optional(),
    // RESEND_FROM_EMAIL: z.string().min(1).optional(),

    // ── Error monitoring via Sentry (optional) ──────────────────────────────
    SENTRY_DSN: z.url().optional(),
    SENTRY_ORG: z.string().min(1).optional(),
    SENTRY_PROJECT: z.string().min(1).optional(),
    SENTRY_AUTH_TOKEN: z.string().min(1).optional(),

    // ── Product analytics via PostHog (optional) ────────────────────────────
    POSTHOG_KEY: z.string().min(1).optional(),
    POSTHOG_HOST: z.url().default('https://us.i.posthog.com'),
  },

  client: {
    NEXT_PUBLIC_API_BASE_URL: z.url(),
    NEXT_PUBLIC_APP_NAME: z.string().min(1).default('PaalStack'),
    NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
    NEXT_PUBLIC_DEBUG_MODE: z
      .string()
      .transform((val) => val === 'true')
      .default(false),

    // ── Supabase (optional — disabled by default) ──────────────────────────
    // Uncomment when enabling Supabase: see README "Enabling Supabase" section.
    // NEXT_PUBLIC_SUPABASE_URL: z.url(),
    // NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),

    // ── Sentry (optional) ───────────────────────────────────────────────────
    NEXT_PUBLIC_SENTRY_DSN: z.url().optional(),

    // ── PostHog (optional) ───────────────────────────────────────────────────
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.url().default('https://us.i.posthog.com'),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    POSTHOG_KEY: process.env.POSTHOG_KEY,
    POSTHOG_HOST: process.env.POSTHOG_HOST,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },

  emptyStringAsUndefined: true,

  // Lets CI run `next build`/`tsc` without real secrets.
  skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
});
