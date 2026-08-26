import { type NextRequest, NextResponse } from 'next/server';

import { hasRoleAtLeast, roleHasPermission, type Permission } from '@/libs/rbac';

/**
 * Route-level RBAC configuration.
 *
 * Map route prefixes to the minimum role or permission required to access them.
 * The middleware checks these BEFORE the page renders — unauthorized users
 * get redirected to login (unauthenticated) or a 403 page (authenticated
 * but insufficient role).
 *
 * @example
 * const ROUTE_GUARDS: RouteGuard[] = [
 *   { path: '/dashboard', permission: 'dashboard:view' },
 *   { path: '/admin', role: 'admin' },
 *   { path: '/settings', role: 'manager' },
 * ];
 */
export type RouteGuard = {
  /** Route prefix to match (e.g. '/admin' matches '/admin', '/admin/users', etc.) */
  path: string;
  /** Minimum role required (mutually exclusive with `permission`). */
  role?: string;
  /** Required permission (mutually exclusive with `role`). */
  permission?: Permission;
};

/**
 * Check a request against route guards. Returns a redirect response if
 * the user fails the guard, or null if access is allowed.
 *
 * @param request The NextRequest from middleware
 * @param guards Your route guard configuration
 * @param user The current user (null if unauthenticated)
 * @param loginPath Where to redirect unauthenticated users (default: '/auth/login')
 * @param forbiddenPath Where to redirect authenticated-but-forbidden users (default: '/403')
 */
export const checkRouteAccess = (
  request: NextRequest,
  guards: RouteGuard[],
  user: { id: string; role: string } | null,
  loginPath = '/auth/login',
  forbiddenPath = '/403'
): NextResponse | null => {
  const { pathname } = request.nextUrl;

  // Find the first matching guard
  const guard = guards.find((g) => pathname.startsWith(g.path));

  if (!guard) return null; // No guard for this route — allow

  // Unauthenticated → redirect to login
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = loginPath;
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // Check role-based guard
  if (guard.role && !hasRoleAtLeast(user.role, guard.role)) {
    const url = request.nextUrl.clone();
    url.pathname = forbiddenPath;
    return NextResponse.redirect(url);
  }

  // Check permission-based guard
  if (guard.permission && !roleHasPermission(user.role, guard.permission)) {
    const url = request.nextUrl.clone();
    url.pathname = forbiddenPath;
    return NextResponse.redirect(url);
  }

  return null; // Access allowed
};
