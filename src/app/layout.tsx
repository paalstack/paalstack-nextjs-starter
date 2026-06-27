import { cn } from '@paalstack/react-ui/lib';
import { type Metadata, type Viewport } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { type ReactNode } from 'react';

import { SiteHeader } from '@/components/SiteHeader';
import { Providers } from '@/providers';

import '@/styles/globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | PaalStack',
    default: 'PaalStack Next.js Starter',
  },
  description:
    'Production-ready Next.js starter template for SaaS, enterprise, admin dashboards, and AI-powered applications.',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PaalStack'],
  authors: [{ name: 'Paalamugan' }],
  creator: 'PaalStack',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'PaalStack Next.js Starter',
    description: 'Production-ready Next.js starter template',
    siteName: 'PaalStack',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaalStack Next.js Starter',
    description: 'Production-ready Next.js starter template',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, 'antialiased')}>
        <NextTopLoader showSpinner={false} height={5} />
        <Providers>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
