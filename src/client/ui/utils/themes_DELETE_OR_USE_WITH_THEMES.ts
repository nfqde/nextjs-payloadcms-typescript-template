import {CustomContrastColors, darken, generateThemes, lighten} from '@nfq/colors';

import type {GetThemeType} from '@nfq/colors';

const SharedColors = {
    /** Page background color in light theme. ![#FFFFFF](https://via.placeholder.com/12/FFFFFF/FFFFFF.png) `#FFFFFF`. */
    pageBackground: '#FFFFFF',
    /** Primary font color. ![#192630](https://via.placeholder.com/12/192630/192630.png) `#192630`. */
    primaryFontColor: '#192630',
    /** Page background color in shared. ![#192630](https://via.placeholder.com/12/192630/192630.png) `#192630`. */
    whiteFontColor: '#FFFFFF'
} as const;

export const BaseColors = {
    customContrast: {
        ...SharedColors,
        /** Page background color in custom contrast theme. */
        pageBackground: CustomContrastColors.Canvas,
        /** Primary font color in custom contrast theme. */
        primaryFontColor: CustomContrastColors.CanvasText
    } as const,
    dark: {
        ...SharedColors,
        /** Page background color in dark theme. ![#192630](https://via.placeholder.com/12/192630/192630.png) `#192630`. */
        pageBackground: '#192630',
        /** Primary font color. ![#FFFFFF](https://via.placeholder.com/12/FFFFFF/FFFFFF.png) `#FFFFFF`. */
        primaryFontColor: '#FFFFFF',
        /** Page background color in dark theme. ![#192630](https://via.placeholder.com/12/192630/192630.png) `#192630`. */
        whiteFontColor: '#FFFFFF'
    } as const,
    light: {...SharedColors} as const
} as const;

export const DerivedColors = {
    dark: {
        /** Lighter Page background color for dark theme. ![#FDFDFD](https://via.placeholder.com/12/FDFDFD/FDFDFD.png) `#FDFDFD`. */
        pageBackgroundVariant: lighten(BaseColors.dark.pageBackground, 10)
    } as const,
    light: {
        /** Darker Page background color for light theme. ![#FDFDFD](https://via.placeholder.com/12/FDFDFD/FDFDFD.png) `#FDFDFD`. */
        pageBackgroundVariant: darken(BaseColors.light.pageBackground, 10)
    } as const
} as const;

const BoxShadows = {
    /** The default dropshadow for Popovers. */
    popOverShadow: '0px 0px 10px 5px rgba(25, 38, 48, 0.05)'
} as const;

export type BaseColorsType = GetThemeType<typeof BaseColors>;
export const {
    globalCss,
    shadows,
    themeColors,
    themes
} = generateThemes({
    baseColors: BaseColors,
    customContrastTheme: 'customContrast',
    defaultTheme: 'light',
    derivedColors: DerivedColors,
    prefersDarkTheme: 'dark',
    shadows: BoxShadows
});