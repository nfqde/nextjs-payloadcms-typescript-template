import type {StorybookConfig} from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: ["./stories/**/*.mdx", "./stories/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@nfq/storybook-github-issues"
    ],
    staticDirs: ['../public'],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    core: {
        disableTelemetry: true, // 👈 Disables telemetry
    },
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

        return config;
    }
};

export default config;