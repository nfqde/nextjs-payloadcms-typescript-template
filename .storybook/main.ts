import type {StorybookConfig} from "@storybook/nextjs-vite";
import {addAliases} from '../withAliases';

const config: StorybookConfig = {
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    core: {
        disableTelemetry: true, // 👈 Disables telemetry
    },
    framework: {
        name: "@storybook/nextjs-vite",
        options: {},
    },
    staticDirs: ['../public', './mock'],
    stories: ["../src/client/ui/**/*.mdx", "../src/client/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    typescript: {
        reactDocgen: "react-docgen-typescript"
    },
    viteFinal: async (config) => {
        addAliases(config);

        return config;
    }
};

export default config;