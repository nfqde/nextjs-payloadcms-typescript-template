import type {StorybookConfig} from "@storybook/nextjs";
import {addAliases} from '../withAliases';
import {addMocks} from '../withMocks';

const config: StorybookConfig = {
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@nfq/storybook-github-issues"
    ],
    core: {
        disableTelemetry: true, // 👈 Disables telemetry
    },
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    staticDirs: ['../public'],
    stories: ["../src/client/ui/**/*.mdx", "../src/client/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    typescript: {
        reactDocgen: "react-docgen-typescript"
    },
    webpackFinal: async (config) => {
        if (config.resolve && config.resolve.fallback) {
            // @ts-expect-error
            config.resolve.fallback['fs'] = false;
            // @ts-expect-error
            config.resolve.fallback['stream'] = false;
            // @ts-expect-error
            config.resolve.fallback['zlib'] = false;
        }

        addAliases(config);
        addMocks(config);

        return config;
    }
};

export default config;