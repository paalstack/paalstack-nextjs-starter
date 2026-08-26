// This client is initialized only when DATABASE_URL is set.
// Uncomment the env.DATABASE_URL line in libs/env/env.ts when enabling Drizzle.

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

/**
 * Drizzle ORM client singleton.
 *
 * Requires `DATABASE_URL` to be set in your environment. Uncomment the
 * DATABASE_URL line in `libs/env/env.ts` and add it to `.env.local` when
 * enabling Drizzle ORM. See README "Enabling Drizzle ORM" section.
 */
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL is not set. Uncomment it in libs/env/env.ts and add it to .env.local.'
  );
}

const client = postgres(connectionString, {
  prepare: false,
});

export const db = drizzle(client, { schema });

export type Database = typeof db;
