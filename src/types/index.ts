export * from './api';

export type AppError = {
  code: string;
  message: string;
  details?: unknown;
};

export type ActionResult<T = void> = { success: true; data: T } | { success: false; error: string };

export type ServerActionState = {
  error?: string;
  success?: boolean;
  message?: string;
};

export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
};

export type DateRange = {
  from: Date;
  to: Date;
};

export type SortDirection = 'asc' | 'desc';
