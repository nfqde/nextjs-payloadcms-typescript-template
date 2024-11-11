import React from 'react';

import styled from 'styled-components';

import {themeColors} from 'UI/utils/theme';

import type {Meta, StoryObj} from '@storybook/react';

/**
 * A simple component that displays the theme colors.
 *
 * @returns The rendered component.
 */
const ColorGrid = () => {
    const baseNames = Object.keys(themeColors);
    const baseValues = Object.values(themeColors);

    return (
        <>
            <Headline>Theme Colors</Headline>
            <Grid>
                {baseNames.map((name, index) => (
                    <ColorDisplay key={name}>
                        {/* eslint-disable-next-line security/detect-object-injection */}
                        <Color $color={baseValues[index]} />
                        <Text>{name}</Text>
                    </ColorDisplay>
                ))}
            </Grid>
        </>
    );
};

const Grid = styled.div`
    align-items: stretch;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    justify-items: center;
    padding: 1rem;
    width: 100%;
`;

const ColorDisplay = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: space-between;
    width: 100%;
`;

const Color = styled.div<{$color: string}>`
    aspect-ratio: 1 / 1;
    background-color: ${({$color}) => $color};
    width: 100%;
`;

const Headline = styled.h1`
    font-family: ${({theme}) => theme.fonts.Lato};
    font-size: 2.2rem;
`;

const Text = styled.span`
    font-family: ${({theme}) => theme.fonts.Lato};
    font-size: 1.2rem;
`;

const meta = {component: ColorGrid} satisfies Meta<typeof ColorGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {};