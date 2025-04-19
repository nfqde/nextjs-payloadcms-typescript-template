import {Global, ThemeProvider} from '@emotion/react';
import {ScreenSizeProvider} from '@nfq/react-grid';
import {LazyMotion} from 'motion/react';

import {globals, theme} from '../src/client/ui/utils/globalStyles';

import type {FeatureBundle} from 'motion/react';
import type {WithChildren} from 'types/global';

import '../src/client/ui/assets/fonts/fonts';

/**
 * Loads the motion features.
 *
 * @returns The motion feature bundle.
 */
const loadMotionFeatures = async (): Promise<FeatureBundle> => {
    const module = await import(
        /* webpackChunkName: "motionFeatures" */
        '../src/client/ui/utils/motionFeatures'
    );

    return module.default;
};

/**
 * The wrapper component.
 *
 * @param props          The component props.
 * @param props.children The children to render.
 * @returns The element to render.
 */
export const Wrapper = ({children}: WithChildren) => (
    <ThemeProvider theme={theme}>
        <Global styles={globals} />
        <ScreenSizeProvider>
            <LazyMotion features={loadMotionFeatures} strict>
                {children}
            </LazyMotion>
        </ScreenSizeProvider>
    </ThemeProvider>
);