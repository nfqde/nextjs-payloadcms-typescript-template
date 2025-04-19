import {css, type Theme} from '@emotion/react';
import {configureFonts, getFontThemeList} from '@nfq/next-fonts';
import {createConfig} from '@nfq/react-grid';

import {globalCss, shadows, themeColors} from 'UI/utils/theme';

export const fontDefinitions = configureFonts({
    Lato: [
        {
            fontDisplay: 'swap',
            fontStyle: 'normal',
            fontWeight: 'bold',
            preload: true,
            src: '/fonts/lato-bold.woff2'
        },
        {
            fontDisplay: 'swap',
            fontStyle: 'normal',
            fontWeight: 'normal',
            preload: true,
            src: '/fonts/lato-regular.woff2'
        }
    ]
});

export const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
export const {configType, globalCss: globalGridCss} = createConfig(breakpoints, {
    baseSpacing: 0.4,
    container: {
        lg: 'fluid',
        md: 'fluid',
        sm: 'fluid',
        xl: 1140,
        xs: 'fluid',
        xxl: 1140
    }
});

export const theme: Theme = {
    boxShadows: shadows,
    colors: themeColors,
    fonts: getFontThemeList(fontDefinitions)
};

export const globals = css`
    ${globalCss}

    ${globalGridCss}

    *,
    &::before,
    &::after {
        box-sizing: border-box;
    }

    * {
        -webkit-tap-highlight-color: transparent;
    }

    html {
        font-size: 10px;
    }

    html, body {
        background-color: ${themeColors.pageBackground};
        color: ${themeColors.primaryFontColor};
        margin: 0;
        min-height: 100%;
        padding: 0;
        scroll-behavior: smooth;
    }

    #__next {
        min-height: 100%;
    }
`;