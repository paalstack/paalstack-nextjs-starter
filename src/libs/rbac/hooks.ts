'use client';

import { useAuth } from '@/features/auth';

import { type PolicyContext, type PolicyRule, evaluatePolicy } from './abac';
import {
  type Permission,
  getRolePermissions,
  hasRoleAtLeast,
  roleHasPermission,
} from './permissions';

/**
 * Get the current user's role. Returns null when unauthenticated.
 */
export const useRole = (): string | null => {
  const { user } = useAuth();
  return user?.role ?? null;
};

/**
 * Check if the current user has at least the given role.
 */
export const useRoleAtLeast = (minimumRole: string): boolean => {
  const role = useRole();
  return hasRoleAtLeast(role, minimumRole);
};

/**
 * Check if the current user has a specific permission.
 */
export const usePermission = (permission: Permission): boolean => {
  const role = useRole();
  return roleHasPermission(role, permission);
};

/**
 * Get all permissions for the current user's role.
 */
export const usePermissions = (): Permission[] => {
  const role = useRole();
  return getRolePermissions(role);
};

/**
 * Check if the current user can access a resource, combining RBAC
 * permission check with ABAC policy rules.
 *
 * @param permission Required RBAC permission
 * @param ctx Partial policy context (resource, environment)
 * @param rules ABAC policy rules to evaluate
 * @param defaultAllow Whether to allow when no rule matches (default: false)
 */
export const useCanAccess = (
  permission: Permission,
  ctx?: Omit<PolicyContext, 'subject'>,
  rules: PolicyRule[] = [],
  defaultAllow = false
): boolean => {
  const { user } = useAuth();

  if (!user) return false;

  // RBAC check first
  if (!roleHasPermission(user.role, permission)) return false;

  // If no ABAC rules, RBAC alone grants access
  if (rules.length === 0 || !ctx) return true;

  // ABAC evaluation
  const result = evaluatePolicy(
    rules,
    { ...ctx, subject: { id: user.id, role: user.role } },
    defaultAllow
  );
  return result.allowed;
};

/**
 * Convenience hook: check multiple permissions at once.
 * Returns true only if the user has ALL given permissions.
 */
export const useHasAllPermissions = (permissions: Permission[]): boolean => {
  const role = useRole();
  return permissions.every((p) => roleHasPermission(role, p));
};

/**
 * Convenience hook: check if the user has ANY of the given permissions.
 */
export const useHasAnyPermission = (permissions: Permission[]): boolean => {
  const role = useRole();
  return permissions.some((p) => roleHasPermission(role, p));
};
