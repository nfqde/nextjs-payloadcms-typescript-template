import type {NextApiRequest, NextApiResponse} from 'next';
import type {NextHandler} from 'next-connect';

/**
 * The `demoMiddleware` function is an asynchronous middleware function used for demo purposes of middlewares in this template.
 *
 * @param req  The incoming request, an instance of `NextApiRequest`.
 * @param res  The outgoing response, an instance of `NextApiResponse`.
 * @param next The next middleware function in the pipeline, an instance of `NextHandler`.
 * @returns     Void as it's a middleware function.
 *
 * @example
 * ```tsx
 * server.use(demoMiddleware);
 * ```
 */
export const demoMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
) => {
    await next();
};