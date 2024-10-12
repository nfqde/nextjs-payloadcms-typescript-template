import {ScreenSizeProvider} from '@nfq/react-grid';
import {LazyMotion} from 'framer-motion';
import {ThemeProvider} from 'styled-components';

import {GlobalStyle, theme} from '../src/client/ui/utils/globalStyles';

import type {FeatureBundle} from 'framer-motion';
import type {WithChildren} from 'types/global';

import '../src/client/ui/assets/fonts/fonts';


/**
 * Loads the framer-motion features.
 *
 * @returns The framer-motion feature bundle.
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
        <GlobalStyle />
        <ScreenSizeProvider>
            <LazyMotion features={loadMotionFeatures} strict>
                {children}
            </LazyMotion>
        </ScreenSizeProvider>
    </ThemeProvider>
);