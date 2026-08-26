import { UnauthorizedError, ForbiddenError } from '@/libs/error';

import {
  type PolicyContext,
  type PolicyRule,
  type PolicyResult,
  checkAccess,
  evaluatePolicy,
} from './abac';
import { type Permission, hasRoleAtLeast, roleHasPermission } from './permissions';

export type AuthSubject = {
  id: string;
  role: string;
};

/**
 * Require the caller to have at least the given role.
 * Throws UnauthorizedError if no user, ForbiddenError if insufficient role.
 */
export const requireRole = (user: AuthSubject | null, minimumRole: string): AuthSubject => {
  if (!user) throw new UnauthorizedError();
  if (!hasRoleAtLeast(user.role, minimumRole)) {
    throw new ForbiddenError(`Requires ${minimumRole} role or higher`);
  }
  return user;
};

/**
 * Require the caller to have the given permission.
 * Throws UnauthorizedError if no user, ForbiddenError if missing permission.
 */
export const requirePermission = (
  user: AuthSubject | null,
  permission: Permission
): AuthSubject => {
  if (!user) throw new UnauthorizedError();
  if (!roleHasPermission(user.role, permission)) {
    throw new ForbiddenError(`Missing permission: ${permission}`);
  }
  return user;
};

/**
 * Require the caller to pass both RBAC permission check and ABAC policy rules.
 * Throws UnauthorizedError if no user, ForbiddenError if denied.
 */
export const requirePolicy = (
  user: AuthSubject | null,
  permission: Permission,
  ctx: Omit<PolicyContext, 'subject'>,
  rules: PolicyRule[] = [],
  defaultAllow = false
): PolicyResult => {
  if (!user) throw new UnauthorizedError();

  const result = checkAccess(permission, { ...ctx, subject: user }, rules, defaultAllow);
  if (!result.allowed) {
    throw new ForbiddenError(result.reason);
  }
  return result;
};

/**
 * Non-throwing permission check. Returns true/false.
 * Use in conditional logic where throwing is undesirable.
 */
export const can = (user: AuthSubject | null, permission: Permission): boolean => {
  if (!user) return false;
  return roleHasPermission(user.role, permission);
};

/**
 * Non-throwing ABAC check. Returns the full policy result.
 */
export const checkAbac = (
  user: AuthSubject | null,
  ctx: Omit<PolicyContext, 'subject'>,
  rules: PolicyRule[],
  defaultAllow = false
): PolicyResult => {
  if (!user) return { allowed: false, reason: 'Not authenticated' };
  return evaluatePolicy(rules, { ...ctx, subject: user }, defaultAllow);
};
