/* eslint-disable no-console */
import {HTTP_STATUS} from '@nfq/typed-next-api';

import type {NextApiRequest, NextApiResponse} from 'next';

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
    console.log(err);

    const {message = 'Unknown error'} = err as Error;

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message,
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR
    });
};