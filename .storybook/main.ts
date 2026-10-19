import {addAliases} from '../withAliases';

import type {StorybookConfig} from '@storybook/nextjs-vite';

const config: StorybookConfig = {
    addons: ['@storybook/addon-links', '@storybook/addon-docs', 'msw-storybook-addon'],
    core: {disableTelemetry: true},
    features: {
        backgrounds: true,
        controls: true,
        highlight: true
    },
    framework: {
        name: '@storybook/nextjs-vite',
        options: {}
    },
    staticDirs: ['../public', './mock'],
    stories: ['../src/client/ui/**/*.mdx', '../src/client/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    typescript: {
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {tsconfigPath: './tsconfig.json'}
    },
    /**
     * Finalizes the Vite configuration for Storybook before it is used.
     * It adds custom path aliases to ensure consistent module resolution across the project.
     * It then returns the updated configuration object for Storybook to consume.
     *
     * @param viteConfig The Vite configuration object provided by Storybook.
     * @returns The updated Vite configuration after aliases are applied.
     *
     * @example
     * ```tsx
     * const updated = await viteFinal({ resolve: { alias: [] } });
     * ```
     */
    viteFinal(viteConfig) {
        addAliases(viteConfig);

        return viteConfig;
    }
};

export default config;