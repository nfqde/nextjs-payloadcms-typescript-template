import path, {resolve} from 'path';
import {fileURLToPath} from 'url';

import {AUTO_LOGIN} from '@app/features';
import {mongooseAdapter} from '@payloadcms/db-mongodb';
import {seoPlugin} from '@payloadcms/plugin-seo';
import {BoldFeature, ItalicFeature, lexicalEditor, UnderlineFeature} from '@payloadcms/richtext-lexical';
import {buildConfig} from 'payload';
import {de} from 'payload/i18n/de';
import sharp from 'sharp';

import {AdminUsers} from 'Payload/collections';
import {generateSeoTitle} from 'Payload/hooks/generateSeoTitle';
import {generateSeoUrl} from 'Payload/hooks/generateSeoUrl';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        ...(AUTO_LOGIN ? {
            autoLogin: {
                email: process.env.PAYLOAD_DEV_USER,
                password: process.env.PAYLOAD_DEV_PASS,
                prefillOnly: false
            }
        } : {}),
        importMap: {baseDir: resolve(dirname, '../../client/ui/components/admin')},
        livePreview: {
            breakpoints: [
                {
                    height: 667,
                    label: 'Mobile',
                    name: 'mobile',
                    width: 375
                },
                {
                    height: 1024,
                    label: 'Tablet',
                    name: 'tablet',
                    width: 768
                },
                {
                    height: 900,
                    label: 'Desktop',
                    name: 'desktop',
                    width: 1440
                }
            ]
        },
        meta: {
            icons: [{url: '/favicon.ico'}],
            titleSuffix: '- Payload template'
        },
        user: AdminUsers.slug
    },
    collections: [AdminUsers],
    cors: [process.env.NEXT_PUBLIC_BASE_URL],
    csrf: [process.env.NEXT_PUBLIC_BASE_URL],
    db: mongooseAdapter({url: process.env.MONGODB_URI}),
    editor: lexicalEditor({
        /**
         * The `features` method returns an array of editor features that define the available text formatting options.
         * In this case, it includes the underline, bold, and italic features.
         * These features extend the editor's capabilities, allowing users to apply basic formatting to their text.
         *
         * @returns An array of features, such as underline, bold, and italic, which enable text formatting options in the editor.
         *
         * @example
         * ```tsx
         * const editorFeatures = lexicalEditor.features();
         * ```
         */
        features() {
            return [
                UnderlineFeature(),
                BoldFeature(),
                ItalicFeature()
            ];
        }
    }),
    i18n: {supportedLanguages: {de}},
    plugins: [
        seoPlugin({
            generateTitle: generateSeoTitle(),
            generateURL: generateSeoUrl()
        })
    ],
    secret: process.env.PAYLOAD_SECRET,
    sharp,
    typescript: {outputFile: resolve(dirname, '../../../types/payload-types.ts')},
    /**
     * The `onInit` function is responsible for initializing the application by checking for existing admin users.
     * If no admin users exist in the system, it creates a new admin user with credentials defined in the environment variables.
     * This is typically used during the setup or initial launch of the application to ensure at least one admin user is present.
     *
     * @param payload The payload object which provides methods to interact with the database (such as `find` and `create`).
     * @returns A promise that resolves once the initialization process is completed.
     *
     * @example
     * ```tsx
     * await onInit(payload);
     * ```
     */
    async onInit(payload) {
        const existingUsers = await payload.find({
            // @ts-expect-error
            collection: AdminUsers.slug,
            limit: 1
        });

        if (existingUsers.docs.length === 0) {
            await payload.create({
                // @ts-expect-error
                collection: AdminUsers.slug,
                data: {
                    email: process.env.PAYLOAD_DEV_USER,
                    password: process.env.PAYLOAD_DEV_PASS
                }
            });
        }
    }
});