/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import {generatePageMetadata, RootPage} from '@payloadcms/next/views';

import {importMap} from '../importMap';

import config from '@payload-config';

import type {Metadata} from 'next';

type Args = {
    params: Promise<{
        segments: string[];
    }>;
    searchParams: Promise<Record<string, string[] | string>>;
};

/**
 * Generates metadata for the Payload admin page using Next.js conventions.
 * It forwards the route params and query parameters to Payload’s metadata helper.
 * This function is async to support streaming and server-side metadata resolution.
 *
 * @param props              The component props.
 * @param props.params       The dynamic route segments for the admin path.
 * @param props.searchParams The parsed query string parameters for the request.
 * @returns A promise that resolves to the Next.js metadata object for the admin page.
 *
 * @example
 * ```tsx
 * const metadata = await generateMetadata({ params, searchParams });
 * ```
 */
export const generateMetadata = async ({params, searchParams}: Args): Promise<Metadata> => generatePageMetadata({
    config,
    params,
    searchParams
});

/**
 * Renders the Payload admin root page with the required configuration.
 * It wires the import map so client components can be resolved correctly.
 * This function is async to align with server component data requirements.
 *
 * @param props              The component props.
 * @param props.params       The dynamic route segments for the admin path.
 * @param props.searchParams The parsed query string parameters for the request.
 * @returns A React element that renders the Payload admin root page.
 *
 * @example
 * ```tsx
 * const page = await Page({ params, searchParams });
 * ```
 */
const Page = async ({params, searchParams}: Args) => RootPage({
    config,
    importMap,
    params,
    searchParams
});

export default Page;