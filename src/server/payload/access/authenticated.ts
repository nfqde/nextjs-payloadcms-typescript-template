import type {AccessArgs} from 'payload';
import type {AdminUser} from 'types/payload-types';

/**
 * The `authenticated` function is an access control function that checks if a user is authenticated.
 * It verifies the presence of a user object in the request and returns `true` if the user is authenticated, allowing access.
 * If the user is not authenticated (i.e., the user object is `null` or `undefined`), it returns `false`, denying access.
 *
 * @param props          The properties object.
 * @param props.req      The request object.
 * @param props.req.user The user object attached to the request, representing the authenticated user.
 * @returns `true` if the user is authenticated; otherwise, `false`.
 *
 * @example
 * ```tsx
 * const accessControl = authenticated({ req: { user } });
 * ```
 */
export const authenticated = ({req: {user}}: AccessArgs<AdminUser>): boolean => Boolean(user);