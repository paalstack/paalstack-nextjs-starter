import { type AppError } from '@/types';

export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/** Maps each error code to its equivalent HTTP status code. */
const ERROR_STATUS_MAP: Record<ErrorCode, number> = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  DUPLICATE_ENTRY: 409,
  DATABASE_ERROR: 500,
  EXTERNAL_SERVICE_ERROR: 502,
  RATE_LIMITED: 429,
  UNKNOWN_ERROR: 500,
};

export class AppErrorBase extends Error {
  readonly code: ErrorCode;
  readonly statusCode: number;
  readonly details?: unknown;

  constructor(code: ErrorCode, message: string, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = ERROR_STATUS_MAP[code];
    this.details = details;
  }
}

export class ValidationError extends AppErrorBase {
  constructor(message = 'Invalid input', details?: unknown) {
    super(ERROR_CODES.VALIDATION_ERROR, message, details);
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends AppErrorBase {
  constructor(message = 'Authentication required') {
    super(ERROR_CODES.UNAUTHORIZED, message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppErrorBase {
  constructor(message = 'You do not have permission to perform this action') {
    super(ERROR_CODES.FORBIDDEN, message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends AppErrorBase {
  constructor(resource = 'Resource') {
    super(ERROR_CODES.NOT_FOUND, `${resource} not found`);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppErrorBase {
  constructor(message = 'Resource already exists', details?: unknown) {
    super(ERROR_CODES.DUPLICATE_ENTRY, message, details);
    this.name = 'ConflictError';
  }
}

export class DatabaseError extends AppErrorBase {
  constructor(message = 'A database error occurred', details?: unknown) {
    super(ERROR_CODES.DATABASE_ERROR, message, details);
    this.name = 'DatabaseError';
  }
}

export class ExternalServiceError extends AppErrorBase {
  constructor(service: string, message = 'External service request failed', details?: unknown) {
    super(ERROR_CODES.EXTERNAL_SERVICE_ERROR, `${service}: ${message}`, details);
    this.name = 'ExternalServiceError';
  }
}

export class RateLimitedError extends AppErrorBase {
  constructor(message = 'Too many requests', details?: unknown) {
    super(ERROR_CODES.RATE_LIMITED, message, details);
    this.name = 'RateLimitedError';
  }
}

export const toAppError = (error: unknown): AppError & { statusCode: number } => {
  if (error instanceof AppErrorBase) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
      statusCode: error.statusCode,
    };
  }
  if (error instanceof Error) {
    return {
      code: ERROR_CODES.UNKNOWN_ERROR,
      message: error.message,
      statusCode: 500,
    };
  }
  return {
    code: ERROR_CODES.UNKNOWN_ERROR,
    message: 'An unexpected error occurred',
    statusCode: 500,
  };
};

export const isAppError = (error: unknown): error is AppError =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  'message' in error &&
  typeof (error as AppError).code === 'string' &&
  typeof (error as AppError).message === 'string';
