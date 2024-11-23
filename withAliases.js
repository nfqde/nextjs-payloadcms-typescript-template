/* eslint-disable no-param-reassign */
const path = require('path');

const aliases = [
    {
        alias: 'Application',
        path: './src/client/application/'
    },
    {
        alias: 'Domain',
        path: './src/client/domain/'
    },
    {
        alias: 'Shared',
        path: './src/client/shared/'
    },
    {
        alias: 'Fonts',
        path: './src/client/ui/assets/fonts/'
    },
    {
        alias: 'Images',
        path: './src/client/ui/assets/images/'
    },
    {
        alias: 'UI',
        path: './src/client/ui/'
    },
    {
        alias: 'ApiRoutes',
        path: './src/pages/api/'
    },
    {
        alias: 'Controllers',
        path: './src/server/controllers/'
    },
    {
        alias: 'Errors',
        path: './src/server/errors/'
    },
    {
        alias: 'Payload',
        path: './src/server/payload/'
    },
    {
        alias: 'ServerConfigs',
        path: './src/server/configs/'
    },
    {
        alias: 'ServerDomain',
        path: './src/server/domain/'
    },
    {
        alias: 'Middleware',
        path: './src/server/middleware/'
    },
    {
        alias: 'Services',
        path: './src/server/services/'
    },
    {
        alias: 'Utils',
        path: './src/server/utils/'
    },
    {
        alias: 'Tests',
        path: './cypress/'
    },
    {
        alias: '@payload-config',
        path: './src/server/payload/payload.config.ts'
    }
];

const extensions = [
    '.js',
    '.ts',
    '.cjs',
    '.mjs',
    '.cts',
    '.mts',
    '.jsx',
    '.tsx',
    '.json',
    '.css',
    '.scss',
    '.sass',
    '.png',
    '.jpeg',
    '.jpg',
    '.svg',
    '.webp'
];

/**
 * Plugin for cors.
 *
 * @param {import('next').NextConfig} nextConfig The next config.
 *
 * @returns {import('next').NextConfig} The next config.
 */
const withAliases = nextConfig => ({
    ...nextConfig,
    /**
     * The webpack config.
     *
     * @param {any} config  The config to use.
     * @param {any} options The options.
     * @returns {any} The nextjs webpack config changed.
     */
    webpack(config, options) {
        aliases.forEach(alias => {
            config.resolve.alias[alias.alias] = path.resolve(__dirname, alias.path);
        });

        config.resolve.extensions = extensions;

        if (typeof nextConfig.webpack === 'function') {
            return nextConfig.webpack(config, options);
        }

        return config;
    }
});

/**
 * Generates aliases for eslint.
 *
 * @returns {any} Alias object.
 */
const withAliasesEslint = () => ({
    alias: {
        extensions,
        map: aliases.map(alias => ([alias.alias, alias.path]))
    }
});

module.exports = {
    aliases,
    extensions,
    withAliases,
    withAliasesEslint
};