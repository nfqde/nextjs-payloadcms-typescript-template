import {authenticated} from 'Payload/access/authenticated';
import {authenticatedAndNotSelf} from 'Payload/access/authenticatedAndNotSelf';

import type {CollectionConfig} from 'payload';

export const AdminUsers: CollectionConfig = {
    access: {
        admin: authenticated,
        create: authenticated,
        delete: authenticatedAndNotSelf,
        read: authenticated,
        update: authenticated
    },
    admin: {
        defaultColumns: ['email', 'createdAt', 'updatedAt'],
        description: 'Eine Liste aller Admin-User.'
    },
    auth: true,
    fields: [],
    slug: 'admin-users'
};