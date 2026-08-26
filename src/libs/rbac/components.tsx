'use client';

import { type ReactNode } from 'react';

import { type PolicyContext, type PolicyRule } from './abac';
import {
  useCanAccess,
  useHasAllPermissions,
  useHasAnyPermission,
  usePermission,
  useRoleAtLeast,
} from './hooks';
import { type Permission } from './permissions';

// ── RBAC Components ───────────────────────────────────────────────────────

type RoleGateProps = {
  /** Minimum role required to see children. */
  role: string;
  children: ReactNode;
  /** Shown when the user doesn't have the required role. */
  fallback?: ReactNode;
};

/**
 * Hide/show children based on the current user's role.
 *
 * IMPORTANT: This is a UI convenience, NOT a security boundary.
 * Always enforce permissions server-side via requireRole/requirePermission.
 */
export const RoleGate = ({ role, children, fallback = null }: RoleGateProps) => {
  const hasRole = useRoleAtLeast(role);
  return <>{hasRole ? children : fallback}</>;
};

type PermissionGateProps = {
  /** Required permission to see children. */
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * Hide/show children based on a single RBAC permission.
 *
 * IMPORTANT: UI convenience only — enforce server-side too.
 */
export const PermissionGate = ({ permission, children, fallback = null }: PermissionGateProps) => {
  const hasPermission = usePermission(permission);
  return <>{hasPermission ? children : fallback}</>;
};

type AnyPermissionGateProps = {
  /** User must have at least ONE of these permissions. */
  permissions: Permission[];
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * Show children if the user has ANY of the given permissions.
 */
export const AnyPermissionGate = ({
  permissions,
  children,
  fallback = null,
}: AnyPermissionGateProps) => {
  const hasAny = useHasAnyPermission(permissions);
  return <>{hasAny ? children : fallback}</>;
};

type AllPermissionsGateProps = {
  /** User must have ALL of these permissions. */
  permissions: Permission[];
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * Show children only if the user has ALL given permissions.
 */
export const AllPermissionsGate = ({
  permissions,
  children,
  fallback = null,
}: AllPermissionsGateProps) => {
  const hasAll = useHasAllPermissions(permissions);
  return <>{hasAll ? children : fallback}</>;
};

// ── ABAC Component ────────────────────────────────────────────────────────

type CanProps = {
  /** Required RBAC permission. */
  permission: Permission;
  /** ABAC policy rules to evaluate (optional). */
  rules?: PolicyRule[];
  /** Resource/environment context for ABAC evaluation. */
  context?: Omit<PolicyContext, 'subject'>;
  /** Whether to allow when no ABAC rule matches (default: false). */
  defaultAllow?: boolean;
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * Combined RBAC + ABAC gate. Hides children if the user lacks the
 * permission OR fails any ABAC policy rule.
 *
 * @example
 * <Can
 *   permission="user:update"
 *   rules={[ownerOnlyRule]}
 *   context={{ resource: { ownerId: post.authorId } }}
 * >
 *   <EditButton />
 * </Can>
 *
 * IMPORTANT: UI convenience only — enforce server-side via requirePolicy.
 */
export const Can = ({
  permission,
  rules,
  context,
  defaultAllow = false,
  children,
  fallback = null,
}: CanProps) => {
  const allowed = useCanAccess(permission, context, rules, defaultAllow);
  return <>{allowed ? children : fallback}</>;
};
