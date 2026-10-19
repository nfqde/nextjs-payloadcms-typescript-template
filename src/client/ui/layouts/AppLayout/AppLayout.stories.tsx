import {AppLayout} from './AppLayout';

import type {Meta, StoryObj} from '@storybook/nextjs-vite';

const meta = {
    argTypes: {children: {table: {disable: true}}},
    component: AppLayout,
    tags: ['autodocs']
} satisfies Meta<typeof AppLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <p>Children</p>,
        route: '/home',
        title: 'AppLayout'
    }
};