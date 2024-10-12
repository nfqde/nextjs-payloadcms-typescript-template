import React from 'react';

import {ScreenSizeProvider} from '@nfq/react-grid';
import {LazyMotion} from 'framer-motion';
import styled, {ThemeProvider} from 'styled-components';

import {GlobalStyle, theme} from 'UI/utils/globalStyles';

import type {WithChildren} from '../../types/global';
import type {FeatureBundle} from 'framer-motion';

import 'Fonts/fonts';

/**
 * Loads the framer-motion features.
 *
 * @returns The framer-motion feature bundle.
 */
const loadMotionFeatures = async (): Promise<FeatureBundle> => {
    const module = await import(
        /* webpackChunkName: "motionFeatures" */
        'UI/utils/motionFeatures'
    );

    return module.default;
};


interface ComponentProps {
    /** The background color. */
    bgColor: string;
    /** The height. */
    height: number | string;
    /** The padding. */
    padding: string;
    /** The test id. */
    testId: string;
    /** The width. */
    width: number | string;
}

/**
 * TestWrapper.
 *
 * @param props          Component props.
 * @param props.testId   The test id.
 * @param props.bgColor  The background color.
 * @param props.children The children.
 * @param props.height   The height.
 * @param props.padding  The padding.
 * @param props.width    The width.
 * @returns The component.
 */
const TestWrapper = ({bgColor, children, height, padding, testId, width}: WithChildren<ComponentProps>) => (
    <TestWrapperElement bgColor={bgColor} data-cy={testId} height={height} padding={padding} width={width}>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ScreenSizeProvider>
                <LazyMotion features={loadMotionFeatures} strict>
                    {children}
                </LazyMotion>
            </ScreenSizeProvider>
        </ThemeProvider>
    </TestWrapperElement>
);

TestWrapper.displayName = 'TestWrapper';
TestWrapper.defaultProps = {
    bgColor: 'transparent',
    height: '100%',
    padding: '0',
    testId: 'TestWrapper',
    width: '100%'
};

export default TestWrapper;

interface TestWrapperElementProps {
    /** The background color. */
    bgColor: string;
    /** The height. */
    height: number | string;
    /** The padding. */
    padding: string;
    /** The width. */
    width: number | string;
}

const TestWrapperElement = styled.div<TestWrapperElementProps>`
    background-color: ${({bgColor}) => bgColor};
    height: ${({height}) => ((Number.isInteger(height)) ? `${height}px` : height)};
    padding: ${({padding}) => padding};
    width: ${({width}) => ((Number.isInteger(width)) ? `${width}px` : width)};
`;