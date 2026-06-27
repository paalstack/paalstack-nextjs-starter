'use client';

import { createBrowserClient } from '@supabase/ssr';

// env.NEXT_PUBLIC_SUPABASE_* are commented out until Supabase is enabled.
// import { env } from '@/libs/env';

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ''
  );
