import type {Access} from 'payload';

/**
 * The `authenticatedOrPublished` function is an access control function that allows access either if the user is authenticated,
 * or if the requested resource has a status of "published".
 * This is useful in scenarios where authenticated users can access all resources, while unauthenticated users can only access published content.
 *
 * If the `user` is present in the request, the function returns `true`, granting access.
 * If the user is not authenticated, the function checks whether the `_status` field of the resource is set to "published".
 *
 * @param props          The properties object.
 * @param props.req      The request object.
 * @param props.req.user The user object attached to the request, representing the authenticated user.
 * @returns `true` if the user is authenticated; otherwise, an object specifying that the resource must have a status of "published".
 *
 * @example
 * ```tsx
 * const accessControl = authenticatedOrPublished({ req: { user } });
 * ```
 */
export const authenticatedOrPublished: Access = ({req: {user}}) => {
    if (user) {
        return true;
    }

    return {_status: {equals: 'published'}};
};