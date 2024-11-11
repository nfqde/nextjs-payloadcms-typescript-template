import {DeleteAfterIconsAdded} from './DeleteAfterIconsAdded';

import type {Meta, StoryObj} from '@storybook/react';

const meta = {
    args: {
        height: 60,
        width: 60
    },
    argTypes: {color1: {control: 'color'}},
    component: DeleteAfterIconsAdded
} satisfies Meta<typeof DeleteAfterIconsAdded>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};