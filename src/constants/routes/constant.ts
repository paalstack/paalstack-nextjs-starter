export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  DASHBOARD: '/dashboard',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
