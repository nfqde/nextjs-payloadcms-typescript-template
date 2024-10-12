/* eslint-disable react/jsx-props-no-spreading */
import {Container} from '@nfq/react-grid';

import type {GetStaticProps} from 'next';
import type {NextSSGPageWithLayout} from 'types/global';

/**
 * The `Home` component is a Next.js page component.
 * It is used as a route and can be accessed throught the nextjs router.
 *
 * @returns A ReactNode representing the `Home` page.
 */
const Home: NextSSGPageWithLayout<typeof getStaticProps> = () => (
    <Container as="section" isFluid>
        Homepage
    </Container>
);

/**
 * `getLayout` is a static property of the `Home` component that is a function designed to wrap the component with a specified layout.
 * It receives the router object, page properties, and the PageComponent and returns the PageComponent wrapped with the necessary layout and properties.
 * This property is essential for applying consistent layouts across different pages in the application.
 *
 * @param router        The Next.js router object representing the current route of the application.
 * @param pageProps     The page properties object representing the properties of the current page.
 * @param PageComponent The PageComponent representing the current page.
 * @returns A ReactNode representing the PageComponent wrapped with the necessary layout and properties.
 *
 * @example
 * ```tsx
 * const LayoutWrappedComponent = Home.getLayout(router, pageProps, PageComponent);
 * ```
 */
Home.getLayout = (router, pageProps, PageComponent) => (
    <PageComponent router={router} {...pageProps} />
);

/**
 * `getLayoutKey` is a static property of the `Home` component that is a function designed to return the layout key string.
 * It is used to determine if the layout changed between pages to apply transitions between different layouts.
 * This property is crucial for managing different layouts within the application and for providing a specific layout key for the `Home` component.
 *
 * @returns A string representing the layout key.
 *
 * @example
 * ```tsx
 * const layoutKey = Home.getLayoutKey();
 * ```
 */
Home.getLayoutKey = () => '';

export default Home;

/**
 * `getStaticProps` is a Next.js function designed to fetch data at build time and pass it as props to the page.
 * It is used in the context of Static Generation and is crucial for pre-rendering pages with dynamic routes, allowing for optimized performance and SEO.
 * This function is essential for fetching the necessary data required by a page and providing it as props, ensuring the correct data is available during the rendering process.
 *
 * @returns A promise resolving to an object containing the `props` to be passed to the page component and a `revalidate` property set to `1`, indicating the time, in seconds, after which a page re-generation can occur.
 */
export const getStaticProps: GetStaticProps = async () => Promise.resolve({
    props: {},
    revalidate: 18000
});