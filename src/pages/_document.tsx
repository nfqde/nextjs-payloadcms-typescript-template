import type {ReactElement} from 'react';

import Document, {Head, Html, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

import type {DocumentContext, DocumentInitialProps} from 'next/document';

/**
 * The `AppDocument` class extends the `Document` class and is used to augment the application's HTML document.
 * It primarily focuses on server-side rendering and is crucial for rendering the initial HTML structure of the application.
 * This class is essential for enhancing the overall structure of the application and for injecting additional elements or attributes into the HTML document.
 */
export default class AppDocument extends Document {
    /**
     * `getInitialProps` is a static asynchronous method designed to compute and return the initial properties for the document.
     * It is responsible for rendering the application on the server side and collecting styles during the initial app load.
     * This method is crucial for optimizing the rendering process and ensuring that the application is styled correctly from the start.
     *
     * @param ctx The DocumentContext object representing the context in which the document is rendered.
     * @returns A promise resolving to an object containing the initial properties for the document, including the collected styles.
     *
     * @example
     * ```tsx
     * const initialProps = await AppDocument.getInitialProps(ctx);
     * ```
     */
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = async () => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                originalRenderPage({enhanceApp: App => props => sheet.collectStyles(<App {...props} />)})
            );

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: [
                    initialProps.styles,
                    sheet.getStyleElement()
                ]
            };
        } finally {
            sheet.seal();
        }
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