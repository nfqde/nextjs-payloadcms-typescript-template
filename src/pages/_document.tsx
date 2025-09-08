import type {ReactElement} from 'react';

import createEmotionServer from '@emotion/server/create-instance';
import Document, {Head, Html, Main, NextScript} from 'next/document';

import {createEmotionCache} from 'Application/configs/emotionCache';

import type {DocumentContext} from 'next/document';

/**
 * The `AppDocument` class extends the `Document` class and is used to augment the application's HTML document.
 * It primarily focuses on server-side rendering and is crucial for rendering the initial HTML structure of the application.
 * This class is essential for enhancing the overall structure of the application and for injecting additional elements or attributes into the HTML document.
 */
export default class AppDocument extends Document {
    /**
     * Overrides the default `getInitialProps` method to support Emotion’s server-side rendering (SSR) in a Next.js application.
     * This method captures the rendered HTML from the `ctx.renderPage()` call and extracts the critical CSS using Emotion’s
     * `renderStaticStyles` function. This ensures that only the styles used during the SSR pass are included in the final HTML,
     * avoiding unstyled flashes and improving performance.
     * The extracted CSS is then injected into the document’s `<head>` using a `<style>` tag with a `data-emotion` attribute
     * to support Emotion’s hydration on the client side. It also preserves any existing styles by including `initialProps.styles`.
     *
     * @param ctx The `DocumentContext` provided by Next.js, containing methods and properties for customizing the document rendering process.
     * @returns An object containing the initial document props along with the injected Emotion styles.
     */
    static async getInitialProps(ctx: DocumentContext) {
        const originalRenderPage = ctx.renderPage;
        const cache = createEmotionCache();
        const {extractCritical} = createEmotionServer(cache);

        ctx.renderPage = async () => originalRenderPage({
            enhanceApp: App => function EnhanceApp(props) {
                // @ts-expect-error
                // eslint-disable-next-line react/jsx-props-no-spreading
                return <App emotionCache={cache} {...props} />;
            }
        });
        const initialProps = await Document.getInitialProps(ctx);
        const {css, ids} = extractCritical(initialProps.html);

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <style
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{__html: css}}
                        data-emotion={`next ${ids.join(' ')}`}
                    />
                </>
            )
        };
    }

    /**
     * The `render` method is responsible for rendering the HTML document structure of the application.
     * It defines the basic HTML elements and structure, including the head, body, and script tags.
     * This method is essential for defining the overall layout and structure of the application's HTML document.
     *
     * @returns A ReactElement representing the HTML document structure of the application.
     */
    render(): ReactElement {
        return (
            <Html lang="de">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}