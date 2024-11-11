import React from 'react';

import styled from 'styled-components';

import type {Meta, StoryObj} from '@storybook/react';

import * as Icons from './index';

interface IconGridProps {
    className?: string;
    color1?: string;
    color2?: string;
    height?: number | string;
    testId?: string;
    width?: number | string;
}

/**
 * The `IconGrid` component is a functional component designed to render a grid of all available icons.
 * It receives several props through the `IconGridProps` interface, allowing for customization of class, color, dimensions, and testing identifier.
 *
 * @param props           The component props.
 * @param props.className A string representing the CSS class to be applied to the IconGrid element to override its default styling.
 * @param props.color1    A string representing the color of the primary icon.
 * @param props.color2    A string representing the color of the secondary icon.
 * @param props.height    A number or string representing the height of the IconGrid element.
 * @param props.testId    A string representing a unique identifier assigned to the component for testing purposes.
 * @param props.width     A number or string representing the height of the IconGrid element.
 * @returns A React element representing the `IconGrid` component with the specified properties.
 */
const IconGrid = ({...args}: IconGridProps) => (
    <Grid>
        {Object.values(Icons).map(Icon => (
            <IconDisplay key={Icon.displayName}>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Icon {...args} />
                <Text>{Icon.displayName}</Text>
            </IconDisplay>
        ))}
    </Grid>
);

const Grid = styled.div`
    align-items: stretch;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    justify-items: center;
    padding: 1rem;
    width: 100%;
`;

const IconDisplay = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: space-between;
`;

const Text = styled.span`
    font-family: 'Arial', sans-serif;
    font-size: 1.2rem;
`;

const meta = {
    args: {
        height: 40,
        width: 40
    },
    argTypes: {
        color1: {control: 'color'},
        color2: {control: 'color'},
        height: {control: 'number'},
        width: {control: 'number'}
    },
    component: IconGrid
} satisfies Meta<typeof IconGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const All: Story = {};