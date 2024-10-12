import {darken, generateThemes} from '@nfq/colors';

import type {GetThemeType} from '@nfq/colors';

export const BaseColors = {
    /** Page background color. ![#FFFFFF](https://via.placeholder.com/12/FFFFFF/FFFFFF.png) `#FFFFFF`. */
    pageBackground: '#FFFFFF',
    /** Primary font color. ![#192630](https://via.placeholder.com/12/192630/192630.png) `#192630`. */
    primaryFontColor: '#192630'
} as const;

export const DerivedColors = {
    /** Darker Page background color. ![#FDFDFD](https://via.placeholder.com/12/FDFDFD/FDFDFD.png) `#FDFDFD`. */
    darkerPageColor: darken(BaseColors.pageBackground, 10)
} as const;

export const BoxShadows = {
    /** The default dropshadow for Popovers. */
    popOverShadow: '0px 0px 10px 5px rgba(25, 38, 48, 0.05)'
} as const;

// BaseColors, DerivedColors, BoxShadows, 'light', 'dark'

export type BaseColorsType = GetThemeType<typeof BaseColors>;
export const {
    globalCss,
    shadows,
    themeColors,
    themes
} = generateThemes({
    baseColors: BaseColors,
    derivedColors: DerivedColors,
    shadows: BoxShadows
});