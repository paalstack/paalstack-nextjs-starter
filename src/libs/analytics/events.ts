/**
 * Canonical catalogue of product analytics events. Add new events here first
 * so every call site stays type-checked against a single source of truth.
 */
export type AnalyticsEventMap = {
  signup_completed: { userId: string };
  login_completed: { userId: string };
};

export type AnalyticsEventName = keyof AnalyticsEventMap;
