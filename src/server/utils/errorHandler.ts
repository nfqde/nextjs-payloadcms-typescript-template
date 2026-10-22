/* eslint-disable no-console */
import {HTTP_STATUS} from '@nfq/typed-next-api';

import type {ApiError} from 'Errors/ApiError';
import type {NextApiRequest, NextApiResponse} from 'next';

/**
 * Type guard function to determine if a given error is an instance of `ApiError`.
 * This function checks whether the passed error object contains a `statusCode` property,
 * which is a distinguishing feature of the `ApiError` class. It enables safe type narrowing,
 * allowing TypeScript to treat the error as an `ApiError` within conditional branches.
 * This is particularly useful in error handling blocks where you want to provide custom logic
 * for known error types while still supporting fallback behavior for generic errors.
 *
 * @param error The unknown error value to check.
 * @returns A boolean indicating whether the error is an `ApiError` instance.
 *
 * @example
 * ```tsx
 * try {
 *   await fetchUser();
 * } catch (error) {
 *   if (isApiError(error)) {
 *     console.error('API Error:', error.statusCode, error.message);
 *   } else {
 *     console.error('Unknown error:', error);
 *   }
 * }
 * ```
 */
const isApiError = (error: unknown): error is ApiError => 'statusCode' in (error as any);

/**
 * `errorHandler` is a robust function designed to handle errors occurring during the processing of API requests.
 * It logs the error to the console and sends a response with an appropriate error message and status code.
 * This function is essential for providing meaningful error information to the client and for debugging purposes, allowing developers to quickly identify and resolve issues.
 *
 * @param err The error object representing the error that occurred during the processing of the API request.
 * @param req The NextApiRequest object representing the incoming API request.
 * @param res The NextApiResponse object representing the outgoing API response.
 *
 * @example
 * ```tsx
 * errorHandler(new Error('Invalid request'), req, res);
 * ```
 */
export const errorHandler = (err: unknown, req: NextApiRequest, res: NextApiResponse): void => {
    console.log('Error in API route:', err);

    if (isApiError(err)) {
        res.status(err.statusCode).json({
            message: err.message,
            statusCode: err.statusCode
        });

        return;
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR
    });
};