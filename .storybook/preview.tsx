import React, {useEffect} from 'react';
import {ScreenSizeProvider} from '@nfq/react-grid';
import {LazyMotion} from 'framer-motion';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle, theme} from '../src/client/ui/utils/globalStyles';

import type {Preview} from "@storybook/react";
import type {FeatureBundle} from "framer-motion";

import '../src/client/ui/assets/fonts/fonts.css';
import {BaseColors, DerivedColors, themes} from '../src/client/ui/utils/theme';

const options = new Set();

if (typeof Object.values(BaseColors)[0] === 'object' && !Array.isArray(Object.values(BaseColors)[0])) {
    Object.keys(BaseColors).forEach(key => options.add(key));
}
if (typeof Object.values(DerivedColors)[0] === 'object' && !Array.isArray(Object.values(DerivedColors)[0])) {
    Object.keys(DerivedColors).forEach(key => options.add(key));
}

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
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <ScreenSizeProvider>
                        <LazyMotion features={loadMotionFeatures} strict>
                            <Story />
                        </LazyMotion>
                    </ScreenSizeProvider>
                </ThemeProvider>
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
