import styled from 'styled-components';

import type {BaseColors, DerivedColors} from 'UI/utils/globalStyles';

import type {darken, lighten, translucify} from '@nfq/react-grid';


export interface ColorProps {
    /**
     * The color value to be applied to the text content.
     * The possible colors are determined by the pallette defined in the theme.
     */
    $color: ReturnType<typeof darken<typeof BaseColors[keyof typeof BaseColors]>>
        | ReturnType<typeof lighten<typeof BaseColors[keyof typeof BaseColors]>>
        | ReturnType<typeof translucify<typeof BaseColors[keyof typeof BaseColors]>>
        | typeof BaseColors[keyof typeof BaseColors]
        | typeof DerivedColors[keyof typeof DerivedColors];
}

/**
 * The Color component is a styled `<span>` component.
 *
 * @param props        The props of the component.
 * @param props.$color The color value to be applied to the text content.
 * @returns            A React component.
 *
 * @example
 * ```tsx
 * const App = () => {
 *     const colors = useThemeColors();
 *
 *     return <Color $color={colors.primaryFontColor}>Hello, World!</Color>;
 * };
 * ```
 */
export const Color = styled.span<ColorProps>`
    color: ${({$color}) => $color};
    transition: color 0.2s ease-in-out;
`;