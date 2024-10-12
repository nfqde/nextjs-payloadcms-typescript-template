import type {Access} from 'payload';

/**
 * The `anyone` function is an access control function that allows access to everyone.
 * It is commonly used in systems where certain resources or routes should be publicly accessible without any restrictions.
 * This function returns `true`, which grants access to all users, regardless of authentication or permissions.
 *
 * @returns `true`, indicating that access is granted to everyone.
 *
 * @example
 * ```tsx
 * const accessControl = anyone();
 * ```
 */
export const anyone: Access = () => true;