import { type Permission, roleHasPermission } from './permissions';

/**
 * ABAC (Attribute-Based Access Control) policy engine.
 *
 * While RBAC checks "what role do you have?", ABAC checks "given the
 * current context, resource attributes, and environment, should this
 * action be allowed?"
 *
 * Use cases RBAC can't handle:
 *  - "Users can only edit their own posts" (ownership check)
 *  - "No writes outside business hours" (time-based)
 *  - "Only allow access from approved IP ranges" (environment)
 *  - "Premium-tier users can access advanced reports" (tenant attribute)
 */

/** The subject (user) attributes available for policy evaluation. */
export type Subject = {
  id: string;
  role: string;
  [key: string]: unknown;
};

/** The resource being accessed. */
export type Resource = {
  id?: string;
  type?: string;
  ownerId?: string;
  [key: string]: unknown;
};

/** The environment / request context. */
export type Environment = {
  ip?: string;
  time?: Date;
  tenantId?: string;
  [key: string]: unknown;
};

/** Full context passed to a policy evaluator. */
export type PolicyContext = {
  subject: Subject;
  resource?: Resource;
  environment?: Environment;
};

/** A policy rule: given a context, return allow/deny with an optional reason. */
export type PolicyRule = {
  name: string;
  /** Returns true to allow, false to deny, or null to abstain (fall through to next rule). */
  evaluate: (ctx: PolicyContext) => boolean | null;
};

export type PolicyResult = {
  allowed: boolean;
  reason: string;
  matchedRule?: string;
};

/**
 * Evaluate a list of policy rules in order. First rule that returns
 * true/false wins. If all rules abstain (return null), the default
 * policy applies.
 *
 * @param rules Ordered list of policy rules
 * @param ctx The subject/resource/environment context
 * @param defaultAllow Whether to allow when no rule matches (default: false — deny by default)
 */
export const evaluatePolicy = (
  rules: PolicyRule[],
  ctx: PolicyContext,
  defaultAllow = false
): PolicyResult => {
  for (const rule of rules) {
    const result = rule.evaluate(ctx);
    if (result === true) {
      return { allowed: true, reason: `Allowed by rule: ${rule.name}`, matchedRule: rule.name };
    }
    if (result === false) {
      return { allowed: false, reason: `Denied by rule: ${rule.name}`, matchedRule: rule.name };
    }
  }
  return {
    allowed: defaultAllow,
    reason: defaultAllow ? 'No matching rule, default allow' : 'No matching rule, default deny',
  };
};

// ── Common reusable policy rules ──────────────────────────────────────────

/** Allow if the subject owns the resource. */
export const ownerOnlyRule: PolicyRule = {
  name: 'owner-only',
  evaluate: (ctx) => {
    if (!ctx.resource?.ownerId) return null;
    return ctx.subject.id === ctx.resource.ownerId;
  },
};

/** Allow if the subject has the given role. */
export const roleRule = (role: string): PolicyRule => ({
  name: `role:${role}`,
  evaluate: (ctx) => ctx.subject.role === role,
});

/** Allow if the subject has the required permission (RBAC bridge). */
export const permissionRule = (permission: Permission): PolicyRule => ({
  name: `permission:${permission}`,
  evaluate: (ctx) => roleHasPermission(ctx.subject.role, permission),
});

/** Allow only during business hours (9-18, Mon-Fri). */
export const businessHoursRule: PolicyRule = {
  name: 'business-hours',
  evaluate: (ctx) => {
    const time = ctx.environment?.time ?? new Date();
    const hour = time.getHours();
    const day = time.getDay();
    if (day === 0 || day === 6) return false; // weekend
    return hour >= 9 && hour < 18;
  },
};

/**
 * Combine RBAC permission check with ABAC policy evaluation.
 * The subject must have the permission AND pass the policy rules.
 */
export const checkAccess = (
  permission: Permission,
  ctx: PolicyContext,
  rules: PolicyRule[] = [],
  defaultAllow = false
): PolicyResult => {
  if (!roleHasPermission(ctx.subject.role, permission)) {
    return { allowed: false, reason: `Missing permission: ${permission}` };
  }

  if (rules.length === 0) {
    return { allowed: true, reason: `Permission granted: ${permission}` };
  }

  return evaluatePolicy(rules, ctx, defaultAllow);
};
