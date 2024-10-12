import {configureFonts, getFontThemeList} from '@nfq/next-fonts';
import {createGlobalStyle} from 'styled-components';

import {globalCss, shadows, themeColors} from 'UI/utils/theme';

import type {Config} from '@nfq/react-grid';
import type {DefaultTheme} from 'styled-components';

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

const nfqgrid: Config = {
    baseSpacing: 0.4,
    container: {
        lg: 'fluid',
        md: 'fluid',
        sm: 'fluid',
        xl: 1140,
        xs: 'fluid',
        xxl: 1140
    }
};

export const theme: DefaultTheme = {
    boxShadows: shadows,
    colors: themeColors,
    fonts: getFontThemeList(fontDefinitions),
    nfqgrid
};

export const GlobalStyle = createGlobalStyle`
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
        background-color: ${({theme: globalTheme}) => globalTheme.colors.pageBackground};
        color: ${({theme: globalTheme}) => globalTheme.colors.primaryFontColor};
        margin: 0;
        min-height: 100%;
        padding: 0;
        scroll-behavior: smooth;
    }

    ${globalCss}

    #__next {
        min-height: 100%;
    }
`;