import type {GenerateTitle} from '@payloadcms/plugin-seo/types';

/**
 * The `generateSeoTitle` function is a utility that creates an SEO-friendly title for a given document.
 * The title is generated based on the presence of a `title` property in the `doc` object.
 * If the `title` is present, it appends " | Payload Website Template" to the document's title.
 * If no title is provided, it defaults to "Payload Website Template".
 *
 * This function is generic and works with any document that may or may not have a `title` property.
 *
 * @returns A function `generateTitle` that generates an SEO-friendly title for the given document.
 *
 * @example
 * ```tsx
 * const generateTitle = generateSeoTitle<Page>();
 * const seoTitle = generateTitle({ doc: { title: 'Home' } }); // Returns: 'Home | Webpage'
 * const defaultTitle = generateTitle({ doc: undefined }); // Returns: 'Webpage'
 * ```
 */
export const generateSeoTitle = <T extends {title?: string} | undefined>() => {
    /**
     * The `generateTitle` function generates an SEO-friendly title based on the provided document.
     * If the document has a `title`, it appends " | Payload Website Template" to it.
     * If no title is provided, it returns a default title of "Payload Website Template".
     *
     * @param props     The properties object.
     * @param props.doc The document object which may or may not contain a `title`.
     * @returns A string representing the SEO-friendly title.
     */
    const generateTitle: GenerateTitle<T> = ({doc}) => (doc?.title ? `${doc.title} | Webpage` : 'Webpage');

    return generateTitle;
};