import React from 'react';

import {Global, ThemeProvider} from '@emotion/react';
import styled from '@emotion/styled';
import {ScreenSizeProvider} from '@nfq/react-grid';
import {LazyMotion} from 'motion/react';

import {GlobalStyle, theme} from 'UI/utils/globalStyles';

import type {WithChildren} from '../../types/global';
import type {FeatureBundle} from 'motion/react';

import 'Fonts/fonts';

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
interface ComponentProps {
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
 * @param props          The component props.
 * @param props.bgColor  Background color of the wrapper container. Defaults to `'transparent'`.
 * @param props.children React children to be rendered inside the wrapper.
 * @param props.height   Height of the wrapper container. Defaults to `'100%'`.
 * @param props.padding  Padding inside the wrapper container. Defaults to `'0'`.
 * @param props.testId   A unique identifier used as `data-cy` for test automation. Defaults to `'TestWrapper'`.
 * @param props.width    Width of the wrapper container. Defaults to `'100%'`.
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
    testId = 'TestWrapper',
    width = '100%'
}: WithChildren<ComponentProps>) => (
    <TestWrapperElement bgColor={bgColor} data-cy={testId} height={height} padding={padding} width={width}>
        <ThemeProvider theme={theme}>
            <Global styles={globals} />
            <ScreenSizeProvider>
                <LazyMotion features={loadMotionFeatures} strict>
                    {children}
                </LazyMotion>
            </ScreenSizeProvider>
        </ThemeProvider>
    </TestWrapperElement>
);

TestWrapper.displayName = 'TestWrapper';

export default TestWrapper;

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