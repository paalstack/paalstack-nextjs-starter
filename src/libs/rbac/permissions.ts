/**
 * Canonical permission catalogue. Add new permissions here first.
 *
 * Naming convention: <resource>:<action>
 *   resource — the domain object (user, org, billing, settings, etc.)
 *   action   — the operation (view, create, update, delete, manage)
 *
 * `manage` is a wildcard — grants all actions on the resource.
 */
export const PERMISSIONS = [
  // User management
  'user:view',
  'user:create',
  'user:update',
  'user:delete',
  'user:manage',

  // Organization / workspace
  'org:view',
  'org:manage',
  'org:invite',
  'org:remove-member',

  // Billing
  'billing:view',
  'billing:manage',

  // Settings
  'settings:view',
  'settings:manage',

  // Dashboard
  'dashboard:view',

  // Admin — full system access
  'admin:manage',
] as const;

export type Permission = (typeof PERMISSIONS)[number];

/**
 * Role-to-permission mapping. Extend or override in your app if needed.
 *
 * Hierarchy: admin > manager > member > viewer > guest
 * Each role inherits all permissions from lower roles.
 */
export const ROLE_PERMISSIONS: Record<string, readonly Permission[]> = {
  admin: [
    'admin:manage',
    'user:manage',
    'org:manage',
    'org:invite',
    'org:remove-member',
    'billing:manage',
    'settings:manage',
    'dashboard:view',
    'user:view',
    'user:create',
    'user:update',
    'user:delete',
    'org:view',
    'billing:view',
    'settings:view',
  ],
  manager: [
    'org:invite',
    'org:remove-member',
    'billing:view',
    'settings:view',
    'dashboard:view',
    'user:view',
    'user:create',
    'user:update',
    'org:view',
  ],
  member: ['dashboard:view', 'org:view', 'settings:view', 'user:view'],
  viewer: ['dashboard:view', 'org:view', 'settings:view'],
  guest: [] as readonly Permission[],
};

/** Higher rank = more privilege. Used for "at least this role" checks. */
export const ROLE_RANK: Record<string, number> = {
  guest: 0,
  viewer: 1,
  member: 2,
  manager: 3,
  admin: 4,
};

/** Check if a role has at least the given minimum role. */
export const hasRoleAtLeast = (role: string | null | undefined, minimum: string): boolean => {
  if (!role) return false;
  const roleRank = ROLE_RANK[role];
  const minRank = ROLE_RANK[minimum];
  if (roleRank === undefined || minRank === undefined) return false;
  return roleRank >= minRank;
};

/** Get all permissions for a role (including inherited). */
export const getRolePermissions = (role: string | null | undefined): Permission[] => {
  if (!role) return [];
  return [...(ROLE_PERMISSIONS[role] ?? [])];
};

/** Check if a role grants a specific permission. */
export const roleHasPermission = (
  role: string | null | undefined,
  permission: Permission
): boolean => {
  const perms = getRolePermissions(role);
  // `manage` wildcard: if role has `<resource>:manage`, it grants all actions on that resource
  const resource = permission.split(':')[0];
  const managePerm = `${resource}:manage` as Permission;
  return perms.includes(permission) || perms.includes(managePerm) || perms.includes('admin:manage');
};
