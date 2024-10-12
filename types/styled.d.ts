/* eslint-disable @typescript-eslint/no-unused-vars */
import 'styled-components';
import {HTMLAttributes} from 'react';

import type {fontDefinitions} from 'UI/utils/globalStyles';
import type {BaseColorsType, shadows, themeColors, themes} from 'UI/utils/theme';

import type {FontList} from '@nfq/next-fonts';
import type {Config} from '@nfq/react-grid';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        boxShadows: typeof shadows;
        colors: typeof themeColors;
        fonts: FontList<typeof fontDefinitions>;
        nfqgrid: Config;
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