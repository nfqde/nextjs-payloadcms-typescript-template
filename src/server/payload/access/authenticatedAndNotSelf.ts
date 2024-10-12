import type {Access} from 'payload';

/**
 * The `authenticatedAndNotSelf` function is an access control function that grants access only if the user is authenticated and their `id` does not match the provided `id` parameter.
 * This is typically used to prevent users from accessing or modifying their own resources while allowing them to access other users' resources.
 *
 * If the user is authenticated and their `id` is different from the provided `id`, access is granted. Otherwise, access is denied.
 *
 * @param props          The properties object.
 * @param props.id       The ID of the resource being accessed.
 * @param props.req      The request object.
 * @param props.req.user The authenticated user object attached to the request.
 * @returns `true` if the user is authenticated and their `id` does not match the resource `id`; otherwise, `false`.
 *
 * @example
 * ```tsx
 * const accessControl = authenticatedAndNotSelf({ id: 'resource-id', req: { user } });
 * ```
 */
export const authenticatedAndNotSelf: Access = ({id, req: {user}}) => {
    if (user && user.id !== id) {
        return true;
    }

    return false;
};