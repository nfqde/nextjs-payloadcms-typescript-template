import type {GenerateURL} from '@payloadcms/plugin-seo/types';

/**
 * The `generateSeoUrl` function is a utility that creates an SEO-friendly URL for a given document.
 * The URL is generated based on the presence of a `slug` property in the `doc` object.
 * If the `slug` is present, it appends the slug to the base URL defined in the environment variable `NEXT_PUBLIC_BASE_URL`.
 * If no slug is provided, it defaults to the base URL.
 *
 * This function is generic and works with any document that may or may not have a `slug` property.
 *
 * @returns A function `generateURL` that generates an SEO-friendly URL for the given document.
 *
 * @example
 * ```tsx
 * const generateURL = generateSeoUrl<{ slug?: string }>();
 * const seoUrl = generateURL({ doc: { slug: 'about' } }); // Returns: 'https://example.com/about'
 * const defaultUrl = generateURL({ doc: undefined }); // Returns: 'https://example.com'
 * ```
 */
export const generateSeoUrl = <T extends {slug?: string} | undefined>() => {
    /**
     * The `generateURL` function generates an SEO-friendly URL based on the provided document.
     * If the document has a `slug`, it appends it to the base URL from the environment variable `NEXT_PUBLIC_BASE_URL`.
     * If no slug is provided, it returns the base URL.
     *
     * @param props     The properties object.
     * @param props.doc The document object which may or may not contain a `slug`.
     * @returns A string representing the SEO-friendly URL.
     */
    const generateURL: GenerateURL<T> = ({doc}) => (
        doc?.slug
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/${doc.slug}`
            : process.env.NEXT_PUBLIC_BASE_URL
    );

    return generateURL;
};