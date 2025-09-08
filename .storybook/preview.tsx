import React, {useEffect} from 'react';
import {ScreenSizeProvider} from '@nfq/react-grid';
import {AnimatePresence, LazyMotion} from 'motion/react';
import {CacheProvider, Global, ThemeProvider} from '@emotion/react';
import * as motion from 'motion/react-m';
import {globals, theme} from '../src/client/ui/utils/globalStyles';
import {LayoutTransition} from '../src/client/ui/animations/layout';

import type {Preview} from '@storybook/nextjs-vite';
import type {FeatureBundle} from 'motion/react';
import {createEmotionCache} from '../src/client/application/configs/emotionCache';

import '../src/client/ui/assets/fonts/fonts.css';
import {BaseColors, DerivedColors, themes} from '../src/client/ui/utils/theme';
import {initialize, mswLoader} from 'msw-storybook-addon';

const options = new Set();

if (typeof Object.values(BaseColors)[0] === 'object' && !Array.isArray(Object.values(BaseColors)[0])) {
    Object.keys(BaseColors).forEach(key => options.add(key));
}
if (typeof Object.values(DerivedColors)[0] === 'object' && !Array.isArray(Object.values(DerivedColors)[0])) {
    Object.keys(DerivedColors).forEach(key => options.add(key));
}

const cache = createEmotionCache();

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

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize();

const preview: Preview = {
    argTypes: {
        ref: {table: {disable: true}},
        theme: {table: {disable: true}},
        as: {table: {disable: true}},
        forwardedAs: {table: {disable: true}}
    },
    decorators: [
        (Story, context) => {
            const selectedTheme = context.globals.nfqTheme || 'light';

            useEffect(() => {
                document.documentElement.dataset.nfqTheme = selectedTheme;
            }, [selectedTheme]);

            return (
                <CacheProvider value={cache}>
                    <ThemeProvider theme={theme}>
                        <Global styles={globals} />
                        <ScreenSizeProvider>
                            <LazyMotion features={loadMotionFeatures} strict>
                                <AnimatePresence>
                                    <motion.div
                                        animate="enter"
                                        exit="exit"
                                        initial="initial"
                                        variants={LayoutTransition}
                                    >
                                        <Story />
                                    </motion.div>
                                </AnimatePresence>
                            </LazyMotion>
                        </ScreenSizeProvider>
                    </ThemeProvider>
                </CacheProvider>
            );
        }
    ],
    globalTypes: {
        nfqTheme: {
            description: 'Global theme for components',
            defaultValue: themes ?? 'light',
            toolbar: {
                title: 'Theme',
                icon: 'circlehollow',
                items: Array.from(options),
                dynamicTitle: true
            }
        }
    },
    loaders: [mswLoader],
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        backgrounds: {
            default: 'None',
            values: [
                {
                    name: 'None',
                    value: 'transparent',
                },
                {
                    name: 'Dark',
                    value: '#000066',
                },
                {
                    name: 'Light',
                    value: '#F3F5F6',
                },
                {
                    name: 'White',
                    value: '#FFFFFF',
                }
            ]
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
            sort: 'requiredFirst'
        }
    }
};

export default preview;
