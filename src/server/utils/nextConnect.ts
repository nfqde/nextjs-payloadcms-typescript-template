import {createRouter} from 'next-connect';

import {demoMiddleware} from 'Middleware/demoMiddleware';

import type {NextApiRequest, NextApiResponse} from 'next';

/**
 * `nextConnect` is a concise function designed to initialize and return a router, which is subsequently equipped with authentication middleware.
 * This function is crucial for establishing secure connections and ensuring that incoming API requests are properly authenticated before they are processed.
 * It leverages the `createRouter` method to instantiate a router object, which is then augmented with `authMiddleware` using the `use` method.
 *
 * @returns A router object that has been initialized and configured with authentication middleware, ready to handle incoming authenticated API requests.
 *
 * @example
 * ```tsx
 * const authenticatedRouter = nextConnect();
 * ```
 */
const nextConnect = () => {
    const router = createRouter<NextApiRequest, NextApiResponse>();

    return router.use(demoMiddleware);
};

export default nextConnect;