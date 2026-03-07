/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import {generatePageMetadata, NotFoundPage} from '@payloadcms/next/views';

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
 * Generates metadata for the admin not-found route using Payload helpers.
 * It forwards routing parameters and search parameters to the Payload metadata generator.
 * This keeps metadata consistent with the Payload admin UI behavior.
 *
 * @param props              The component props.
 * @param props.params       The route parameters promise used to resolve the requested segments.
 * @param props.searchParams The query string parameters promise provided by Next.js routing.
 * @returns A promise that resolves to the Next.js metadata object for the page.
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
 * Renders the Payload admin not-found page for unmatched admin routes.
 * It supplies the Payload config and import map so the admin UI can render correctly.
 * It also passes through route and search parameters to keep behavior consistent with other admin pages.
 *
 * @param props              The component props.
 * @param props.params       The route parameters promise used to resolve the requested segments.
 * @param props.searchParams The query string parameters promise provided by Next.js routing.
 * @returns A promise that resolves to the rendered not-found page element.
 *
 * @example
 * ```tsx
 * const page = await NotFound({ params, searchParams });
 * ```
 */
const NotFound = async ({params, searchParams}: Args) => NotFoundPage({
    config,
    importMap,
    params,
    searchParams
});

export default NotFound;