'use client';

import { LuMoon, LuSun } from '@paalstack/react-icons/lu';
import { Box, IconButton, useNextTheme } from '@paalstack/react-ui';
import { cn } from '@paalstack/react-ui/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';

import { ROUTES } from '@/constants/routes';

const NAV_LINKS = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'About', href: ROUTES.ABOUT },
] as const;

const ThemeToggle = () => {
  const { isDark, setTheme } = useNextTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <IconButton
        aria-label="Toggle theme"
        variant="ghost"
        fontSize="sm"
        icon={<LuMoon className="size-4" />}
      />
    );
  }

  return (
    <IconButton
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      variant="ghost"
      fontSize="sm"
      icon={isDark ? <LuSun className="size-4" /> : <LuMoon className="size-4" />}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    />
  );
};

const SiteHeader = () => {
  const pathname = usePathname();

  return (
    <Box
      as="header"
      className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm"
    >
      <Box className="container flex h-14 items-center justify-between">
        <Box as="nav" className="flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {label}
              </Link>
            );
          })}
        </Box>

        <ThemeToggle />
      </Box>
    </Box>
  );
};

export { SiteHeader };
