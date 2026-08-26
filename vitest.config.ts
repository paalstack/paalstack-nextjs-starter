import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // Nothing fails CI just because a fresh feature area hasn't grown tests
    // yet — coverage is opt-in per module, not enforced repo-wide.
    passWithNoTests: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // Playwright specs live under src/test/e2e and must not be picked up by
    // Vitest — they import `@playwright/test`'s `test.describe`, which Vitest
    // can't run and throws "did not expect test.describe() to be called here".
    exclude: ['node_modules', 'dist', '.next', '.idea', '.git', '.cache', 'src/test/e2e'],
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov', 'cobertura'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        '**/*.test.*',
        '**/*.spec.*',
        'dist/',
        '.next/',
        'src/app/layout.tsx',
        'src/app/error.tsx',
        'src/app/loading.tsx',
        'src/app/not-found.tsx',
        'src/**/index.ts',
      ],
    },
  },
});
