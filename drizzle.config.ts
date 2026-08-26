import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/libs/db/migrations',
  schema: './src/libs/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
