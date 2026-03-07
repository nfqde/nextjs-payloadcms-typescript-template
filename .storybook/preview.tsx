import React, {useEffect} from 'react';

import {CacheProvider, Global, ThemeProvider} from '@emotion/react';
import {ScreenSizeProvider} from '@nfq/react-grid';
import {AnimatePresence, LazyMotion} from 'motion/react';
import * as motion from 'motion/react-m';
import {initialize, mswLoader} from 'msw-storybook-addon';

import {createEmotionCache} from '../src/client/application/configs/emotionCache';
import {LayoutTransition} from '../src/client/ui/animations/layout';
import {globals, theme} from '../src/client/ui/utils/globalStyles';
import {BaseColors, DerivedColors, themes} from '../src/client/ui/utils/theme';

import type {Preview} from '@storybook/nextjs-vite';
import type {FeatureBundle} from 'motion/react';

// eslint-disable-next-line import/extensions
import '../src/client/ui/assets/fonts/fonts.css';

const options = new Set<string>();

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
        as: {table: {disable: true}},
        forwardedAs: {table: {disable: true}},
        ref: {table: {disable: true}},
        theme: {table: {disable: true}}
    },
    decorators: [
        (Story, context) => {
            const selectedTheme = context.globals.nfqTheme ?? 'light';

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
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            defaultValue: themes ?? 'light',
            description: 'Global theme for components',
            toolbar: {
                dynamicTitle: true,
                icon: 'circlehollow',
                items: Array.from(options),
                title: 'Theme'
            }
        }
    },
    loaders: [mswLoader],
    parameters: {
        actions: {argTypesRegex: '^on[A-Z].*'},
        backgrounds: {
            default: 'None',
            values: [
                {
                    name: 'None',
                    value: 'transparent'
                },
                {
                    name: 'Dark',
                    value: '#000066'
                },
                {
                    name: 'Light',
                    value: '#F3F5F6'
                },
                {
                    name: 'White',
                    value: '#FFFFFF'
                }
            ]
        },
        controls: {
            matchers: {
                color: /(background|color)$/iu,
                date: /Date$/u
            },
            sort: 'requiredFirst'
        }
    }
};

export default preview;