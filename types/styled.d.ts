/* eslint-disable @typescript-eslint/no-unused-vars */
import '@emotion/react';
import '@nfq/react-grid';
import {HTMLAttributes} from 'react';

import type {breakpoints, configType, fontDefinitions} from 'UI/utils/globalStyles';
import type {BaseColorsType, shadows, themeColors, themes} from 'UI/utils/theme';

import type {FontList} from '@nfq/next-fonts';

// and extend them!
declare module '@emotion/react' {
    export interface Theme {
        boxShadows: typeof shadows;
        colors: typeof themeColors;
        fonts: FontList<typeof fontDefinitions>;
    }

    export interface NFQColors {
        themeBaseColors: BaseColorsType;
        themeFullColors: typeof themeColors;
    }
}

declare module 'react' {
    interface HTMLAttributes<T> {
        // extends React's HTMLAttributes
        'data-nfq-theme'?: typeof themes;
    }
}

declare module '@nfq/react-grid' {
    export interface UserConfig {
        UserConfig: {
            Breakpoints: typeof breakpoints;
            Config: typeof configType;
        };
    }
}