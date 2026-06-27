import {
  Box,
  TypographyCode,
  TypographyH1,
  TypographyH2,
  TypographyLI,
  TypographyMuted,
  TypographyP,
  TypographyStrong,
  TypographyUL,
  VStack,
} from '@paalstack/react-ui';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About PaalStack Next.js Starter — the official Next.js foundation template for PaalStack applications.',
};

const STRUCTURE_ENTRIES = [
  { path: 'src/app/', description: 'Next.js App Router pages, layouts, and API routes' },
  { path: 'src/actions/', description: 'Server Actions for form handling and mutations' },
  { path: 'src/apis/', description: 'Axios HTTP client and typed API service modules' },
  { path: 'src/components/', description: 'Shared UI components (not page-specific)' },
  { path: 'src/constants/', description: 'App-wide constants and route definitions' },
  { path: 'src/features/', description: 'Feature-scoped modules (auth, etc.)' },
  { path: 'src/hooks/', description: 'Custom React hooks — queries, mutations, utilities' },
  { path: 'src/libs/', description: 'Third-party library configs (env, query-client, axios)' },
  { path: 'src/providers/', description: 'React context providers (QueryProvider, ThemeProvider)' },
  { path: 'src/schemas/', description: 'Zod validation schemas for forms and APIs' },
  { path: 'src/services/', description: 'Business-logic service layer' },
  { path: 'src/stores/', description: 'Zustand global state with devtools and persistence' },
  { path: 'src/styles/', description: 'Global CSS and Tailwind v4 theme configuration' },
  { path: 'src/test/', description: 'Test utilities, setup, and Playwright E2E specs' },
  { path: 'src/types/', description: 'Shared TypeScript type definitions' },
  { path: 'src/utils/', description: 'Pure utility functions (cn, logger, helpers)' },
] as const;

const CONVENTIONS = [
  'Components: component.tsx + index.ts barrel export',
  'Pages: app/route/page.tsx (Next.js App Router convention)',
  'Hooks: hook.ts + index.ts',
  'API modules: api.ts + type.ts + index.ts',
  'Test files co-located next to the source file (*.test.tsx)',
  'Server Actions: src/actions/ directory',
] as const;

const AboutPage = () => {
  return (
    <Box as="main" className="container py-12">
      <VStack className="items-start gap-8">
        {/* ── Heading ───────────────────────────────────────────────────── */}
        <VStack className="items-start gap-3">
          <TypographyH1>About This Starter</TypographyH1>
          <TypographyP className="text-muted-foreground max-w-2xl text-sm">
            PaalStack Next.js Starter is the official foundation template for all future PaalStack
            applications — designed for{' '}
            <TypographyStrong className="text-foreground">
              SaaS, enterprise tools, admin dashboards, internal tools,
            </TypographyStrong>{' '}
            and{' '}
            <TypographyStrong className="text-foreground">AI-powered applications</TypographyStrong>
            . It follows production conventions so teams can onboard and ship features immediately.
          </TypographyP>
        </VStack>

        <hr className="border-border w-full" />

        {/* ── Project structure ─────────────────────────────────────────── */}
        <VStack className="w-full items-start gap-4">
          <TypographyH2 className="text-foreground">Project Structure</TypographyH2>
          <TypographyP className="text-muted-foreground text-sm">
            Each module follows a consistent{' '}
            <TypographyCode className="bg-muted rounded px-1 font-mono text-xs">
              component.tsx / page.tsx + index.ts
            </TypographyCode>{' '}
            barrel pattern.
          </TypographyP>

          <TypographyUL
            unstyled
            className="border-border bg-muted/30 flex w-full flex-col gap-2 rounded-lg border p-4"
          >
            {STRUCTURE_ENTRIES.map(({ path, description }) => (
              <TypographyLI key={path} className="flex items-start gap-2 text-sm">
                <TypographyCode className="bg-muted text-primary shrink-0 rounded px-1.5 py-0.5 font-mono text-xs">
                  {path}
                </TypographyCode>
                <TypographyMuted className="text-sm">{description}</TypographyMuted>
              </TypographyLI>
            ))}
          </TypographyUL>
        </VStack>

        <hr className="border-border w-full" />

        {/* ── Conventions ───────────────────────────────────────────────── */}
        <VStack className="items-start gap-3">
          <TypographyH2 className="text-foreground text-xl font-semibold">
            File Conventions
          </TypographyH2>
          <TypographyUL className="text-muted-foreground flex list-inside list-disc flex-col items-start gap-1.5 text-sm">
            {CONVENTIONS.map((item) => (
              <TypographyLI key={item}>{item}</TypographyLI>
            ))}
          </TypographyUL>
        </VStack>
      </VStack>
    </Box>
  );
};

export default AboutPage;
