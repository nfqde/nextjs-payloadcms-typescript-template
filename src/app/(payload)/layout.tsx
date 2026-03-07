/* eslint-disable @nfq/component-file-structure */
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from 'react';

import {handleServerFunctions, RootLayout} from '@payloadcms/next/layouts';

import config from '@payload-config';

import '@payloadcms/next/css';
// eslint-disable-next-line import/extensions
import {importMap} from './admin/importMap.js';

import type {ServerFunctionClient} from 'payload';

// eslint-disable-next-line import/extensions
import './custom.scss';

type Args = {
    children: React.ReactNode;
};

/**
 * Executes Payload server functions within the Next.js server context for the admin bundle.
 * It wraps the request arguments and enriches them with the Payload config and import map.
 * It is intended to be used by the RootLayout to proxy server-side actions.
 *
 * @param args The server function arguments provided by Payload.
 * @returns A promise that resolves with the result of the server function handling.
 *
 * @example
 * ```tsx
 * await serverFunction({ req, res, path: '/admin' });
 * ```
 */
const serverFunction: ServerFunctionClient = async function(args) {
    'use server';

    return handleServerFunctions({
        ...args,
        config,
        importMap
    });
};

/**
 * Renders the Payload admin RootLayout for the Next.js app route.
 * It injects configuration and the server function so admin features can execute correctly.
 * It also renders the provided children inside the layout.
 *
 * @param props          The component props.
 * @param props.children The React nodes to render inside the admin layout.
 * @returns A React element that wraps children with the Payload RootLayout.
 *
 * @example
 * ```tsx
 * <Layout>{children}</Layout>
 * ```
 */
const Layout = ({children}: Args) => (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
        {children}
    </RootLayout>
);

export default Layout;