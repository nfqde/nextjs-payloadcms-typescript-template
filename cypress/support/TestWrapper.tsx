import React from 'react';

import {CacheProvider, Global, ThemeProvider} from '@emotion/react';
import styled from '@emotion/styled';
import {Form} from '@nfq/react-form';
import {ScreenSizeProvider} from '@nfq/react-grid';
import {LazyMotion} from 'motion/react';
import {RouterContext} from 'next/dist/shared/lib/router-context.shared-runtime';
import {SWRConfig} from 'swr';

import {createEmotionCache} from 'Application/configs/emotionCache';
import {globals, theme} from 'UI/utils/globalStyles';

import type {WithChildren} from '../../types/global';
import type {FeatureBundle} from 'motion/react';
import type {NextRouter} from 'next/router';

import 'Fonts/fonts';

/**
 * Creates a fully mocked `NextRouter` object for use in Cypress tests.
 * This utility sets up a default router configuration compatible with Next.js,
 * with all navigation methods (`push`, `replace`, `back`, etc.) stubbed or spied for assertions.
 * It allows custom overrides via the `params` argument to simulate different route states.
 *
 * @param params A partial `NextRouter` object used to override default mock values.
 * @returns A mocked `NextRouter` object with Cypress spies and stubs attached.
 *
 * @example
 * ```tsx
 * const router = createFakeRouter({ pathname: '/login' });
 * expect(router.pathname).to.eq('/login');
 * cy.wrap(router.push).should('have.been.called');
 * ```
 */
const createFakeRouter = (params: Partial<NextRouter>) => ({
    asPath: '/',
    back: cy.spy().as('back'),
    basePath: '',
    beforePopState: cy.spy().as('beforePopState'),
    defaultLocale: 'de',
    domainLocales: [],
    events: {
        emit: cy.spy().as('emit'),
        off: cy.spy().as('off'),
        on: cy.spy().as('on')
    },
    forward: cy.spy().as('forward'),
    isFallback: false,
    isLocaleDomain: false,
    isPreview: false,
    isReady: true,
    pathname: '/',
    prefetch: cy.stub().as('prefetch').resolves(),
    push: cy.spy().as('push'),
    query: {},
    reload: cy.spy().as('reload'),
    replace: cy.spy().as('replace'),
    route: '/',
    ...params
});

const clientSideEmotionCache = createEmotionCache();

/**
 * Dynamically loads the Framer Motion features bundle used for animations.
 * This function uses code-splitting via Webpack's `import()` to lazily load motion features when needed,
 * optimizing initial bundle size and performance.
 * The `motionFeatures` module is expected to export a `default` value that conforms to `FeatureBundle`,
 * which is returned and consumed by animation providers like `LazyMotion`.
 *
 * @returns A promise that resolves to a `FeatureBundle` containing Framer Motion animation features.
 *
 * @example
 * ```tsx
 * const features = await loadMotionFeatures();
 * ```
 */
const loadMotionFeatures = async (): Promise<FeatureBundle> => {
    const module = await import(
        /* webpackChunkName: "motionFeatures" */
        'UI/utils/motionFeatures'
    );

    return module.default;
};

/**
 * Props for the `TestWrapper` component.
 * These properties control the layout, styling, and testing behavior of the wrapper element.
 */
export interface TestWrapperProps {
    /**
     * Optional background color for the wrapper container.
     * Can be any valid CSS color string (e.g., `'white'`, `'#f0f0f0'`, `'rgba(0,0,0,0.1)'`).
     *
     * @default 'transparent'
     */
    bgColor?: string;
    /**
     * Optional height for the wrapper container.
     * Accepts numeric pixel values or string-based CSS units (e.g., `'100%'`, `'50vh'`, `300`).
     *
     * @default '100%'
     */
    height?: number | string;
    /**
     * Optional padding inside the wrapper container.
     * Accepts any valid CSS padding value (e.g., `'1rem'`, `'20px 10px'`, `'0'`).
     *
     * @default '0'
     */
    padding?: string;
    /**
     * Optional router parameters for the mocked `NextRouter` object.
     * This allows you to customize the router state for testing purposes.
     */
    routerParams?: Partial<NextRouter>;
    /**
     * The `testId` property represents a unique identifier used for test automation.
     * It is rendered as a `data-cy` attribute on the wrapper and used to target the component in Cypress or similar tools.
     *
     * @default 'TestWrapper'
     */
    testId?: string;
    /**
     * Optional width for the wrapper container.
     * Accepts numeric pixel values or string-based CSS units (e.g., `'100%'`, `'80vw'`, `400`).
     *
     * @default '100%'
     */
    width?: number | string;
}

/**
 * The `TestWrapper` component.
 * This wrapper component is used for rendering children inside a controlled layout with optional styles,
 * test identifiers, and shared providers like `ThemeProvider`, `ScreenSizeProvider`, and animation context (`LazyMotion`).
 * It is useful for visual testing, layout isolation, or previewing components with full context setup.
 *
 * @param props              The component props.
 * @param props.bgColor      Background color of the wrapper container. Defaults to `'transparent'`.
 * @param props.children     React children to be rendered inside the wrapper.
 * @param props.height       Height of the wrapper container. Defaults to `'100%'`.
 * @param props.padding      Padding inside the wrapper container. Defaults to `'0'`.
 * @param props.routerParams Router parameters for the mocked `NextRouter` object.
 * @param props.testId       A unique identifier used as `data-cy` for test automation. Defaults to `'TestWrapper'`.
 * @param props.width        Width of the wrapper container. Defaults to `'100%'`.
 * @returns A React element representing the `TestWrapper` component.
 *
 * @example
 * ```tsx
 * <TestWrapper testId="my-wrapper" bgColor="#f9f9f9" padding="2rem">
 *   <MyComponent />
 * </TestWrapper>
 * ```
 */
const TestWrapper = ({
    bgColor = 'transparent',
    children,
    height = '100%',
    padding = '0',
    routerParams = {},
    testId = 'TestWrapper',
    width = '100%'
}: WithChildren<TestWrapperProps>) => {
    // eslint-disable-next-line @nfq/component-single-hook
    const router = createFakeRouter(routerParams);

    return (
        <CacheProvider value={clientSideEmotionCache}>
            <TestWrapperElement bgColor={bgColor} data-cy={testId} height={height} padding={padding} width={width}>
                <RouterContext.Provider value={router}>
                    <ThemeProvider theme={theme}>
                        <Global styles={globals} />
                        <ScreenSizeProvider>
                            <SWRConfig
                                value={{
                                    dedupingInterval: 0,
                                    provider: () => new Map(),
                                    revalidateOnFocus: false,
                                    revalidateOnReconnect: false
                                }}
                            >
                                <LazyMotion features={loadMotionFeatures} strict>
                                    <Form id="test" onSubmit={async () => {}}>
                                        {children}
                                    </Form>
                                </LazyMotion>
                            </SWRConfig>
                        </ScreenSizeProvider>
                    </ThemeProvider>
                </RouterContext.Provider>
            </TestWrapperElement>
        </CacheProvider>
    );
};

TestWrapper.displayName = 'TestWrapper';

export {TestWrapper};

interface TestWrapperElementProps {
    bgColor: string;
    height: number | string;
    padding: string;
    width: number | string;
}

const TestWrapperElement = styled.div<TestWrapperElementProps>`
    background-color: ${({bgColor}) => bgColor};
    height: ${({height}) => ((Number.isInteger(height)) ? `${height}px` : height)};
    padding: ${({padding}) => padding};
    width: ${({width}) => ((Number.isInteger(width)) ? `${width}px` : width)};
`;