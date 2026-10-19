import type {HTTP_STATUS} from '@nfq/typed-next-api';

/**
 * Custom error class for representing API-specific errors with status codes.
 * The `ApiError` class extends the built-in `Error` class to include an HTTP status code alongside the standard error message.
 * This is useful for structured error handling in API routes, allowing consumers to distinguish between different types of failures (e.g., 400 Bad Request, 401 Unauthorized, etc.).
 * It can be thrown in service or controller logic to signal meaningful errors that can be caught and serialized in API responses.
 *
 * @example
 * ```tsx
 * throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
 * ```
 */
export class ApiError extends Error {
    /**
     * Creates a new instance of `ApiError` with a status code and a message.
     *
     * @param statusCode      The HTTP status code representing the error (e.g., 404, 401).
     * @param message         A human-readable error message explaining the failure.
     * @param internalMessage An optional internal message for logging or debugging purposes.
     */
    constructor(readonly statusCode: HTTP_STATUS, readonly message: string, readonly internalMessage?: string) {
        super(message);
    }
}