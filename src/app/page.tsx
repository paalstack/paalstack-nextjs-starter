import {
  LuAtom,
  LuCode,
  LuDatabase,
  LuFlaskConical,
  LuPackage,
  LuPaintbrush,
  LuShield,
  LuShieldCheck,
  LuZap,
} from '@paalstack/react-icons/lu';
import {
  Box,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Grid,
  GridItem,
  TypographyCode,
  TypographyH1,
  TypographyP,
  VStack,
} from '@paalstack/react-ui';
import { type Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to PaalStack Next.js Starter — a production-ready template for modern web applications.',
};

const FEATURES = [
  {
    title: 'Next.js 16 App Router',
    description:
      'Built with the latest Next.js App Router, Server Components, and streaming support for optimal performance and developer experience.',
  },
  {
    title: 'React 19',
    description:
      'Leverages React 19 with Server Actions, improved hydration, and the latest concurrent features for responsive UIs.',
  },
  {
    title: 'Tailwind CSS v4',
    description:
      'Utility-first CSS with Tailwind v4 and @paalstack/react-ui design tokens for consistent, themeable styling across your app.',
  },
  {
    title: 'TanStack Query',
    description:
      'Powerful async state management for server data with caching, background refetching, optimistic updates, and DevTools.',
  },
  {
    title: 'Zustand',
    description:
      'Lightweight, flexible client state management with devtools integration and localStorage persistence out of the box.',
  },
  {
    title: 'TypeScript Strict',
    description:
      'Strict TypeScript configuration with comprehensive ESLint flat config, Prettier formatting, and import order enforcement.',
  },
  {
    title: 'Vitest + Playwright',
    description:
      'Unit and integration testing with Vitest and React Testing Library, plus end-to-end testing with Playwright.',
  },
  {
    title: 'Auth Ready',
    description:
      'Authentication scaffold with clear integration points for NextAuth.js, Clerk, Auth0, or AWS Cognito — your choice.',
  },
  {
    title: 'Environment Validation',
    description:
      'Strict runtime environment variable validation using @t3-oss/env-nextjs and Zod — misconfigured deployments fail fast.',
  },
] as const;

const FEATURE_ICONS: Record<(typeof FEATURES)[number]['title'], React.ReactNode> = {
  'Next.js 16 App Router': <LuZap className="text-muted-foreground size-5" />,
  'React 19': <LuAtom className="text-muted-foreground size-5" />,
  'Tailwind CSS v4': <LuPaintbrush className="text-muted-foreground size-5" />,
  'TanStack Query': <LuDatabase className="text-muted-foreground size-5" />,
  Zustand: <LuPackage className="text-muted-foreground size-5" />,
  'TypeScript Strict': <LuCode className="text-muted-foreground size-5" />,
  'Vitest + Playwright': <LuFlaskConical className="text-muted-foreground size-5" />,
  'Auth Ready': <LuShield className="text-muted-foreground size-5" />,
  'Environment Validation': <LuShieldCheck className="text-muted-foreground size-5" />,
};

const HomePage = () => {
  return (
    <Box as="main" className="container py-12">
      <VStack className="items-start gap-10">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <VStack className="items-start gap-4">
          <TypographyH1>Welcome to PaalStack Next.js Starter</TypographyH1>
          <TypographyP className="text-muted-foreground max-w-2xl text-lg">
            A production-ready Next.js&nbsp;16 starter with Supabase integration template built with
            React&nbsp;19, Tailwind CSS v4, and{' '}
            <TypographyCode className="bg-muted rounded px-1 py-0.5 font-mono text-sm">
              @paalstack/react-ui
            </TypographyCode>
            &nbsp;— the official foundation for all PaalStack applications.
          </TypographyP>
        </VStack>

        {/* ── Feature grid ───────────────────────────────────────────────── */}
        <Grid className="w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <GridItem key={feature.title}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <Box className="mb-2">{FEATURE_ICONS[feature.title]}</Box>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default HomePage;
