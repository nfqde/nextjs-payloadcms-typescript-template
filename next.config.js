/* eslint-disable no-param-reassign */
const withBundleAnalyzer = require('@next/bundle-analyzer')({enabled: process.env.ANALYZE === 'true'});
const {withFeatureFlags} = require('@nfq/feature-flags/next');
const {WatchFontsConfigPlugin} = require('@nfq/next-fonts/webpack');
const {withPayload} = require('@payloadcms/next/withPayload');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

const devFeatures = require('./features.dev');
const liveFeatures = require('./features.live');
const stageFeatures = require('./features.stage');
const testFeatures = require('./features.test');
const {permissions} = require('./headers');
const {withAliases} = require('./withAliases');
const withCors = require('./withCors');

/** @type {import('next').NextConfig} */
const nextConfig = phase => ({
    compiler: {styledComponents: true},
    eslint: {ignoreDuringBuilds: true},
    experimental: {
        swcPlugins: [[
            '@nfq/feature-flags', {
                featureEnv: process.env.FEATURE_ENV || 'stage',
                featureFlags: {
                    dev: devFeatures,
                    live: liveFeatures,
                    stage: stageFeatures,
                    test: testFeatures
                }
            }
        ]]
    },
    output: 'standalone',
    reactStrictMode: true,
    /**
     * The headers to send.
     *
     * @returns {Promise<Array<{headers: Array<{key: string, value: string}>, source: string}>>} The headers to send.
     */
    async headers() {
        return [{
            headers: [
                {
                    key: 'X-DNS-Prefetch-Control',
                    value: 'on'
                },
                {
                    key: 'Strict-Transport-Security',
                    value: 'max-age=63072000; includeSubDomains; preload'
                },
                {
                    key: 'X-XSS-Protection',
                    value: '1; mode=block'
                },
                {
                    key: 'X-Frame-Options',
                    value: 'SAMEORIGIN'
                },
                {
                    key: 'Referrer-Policy',
                    value: 'same-origin'
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff'
                },
                {
                    key: 'Permissions-Policy',
                    value: permissions.join(', ')
                }
            ],
            source: '/(.*)'
        }];
    },
    /**
     * The webpack config.
     *
     * @param {import('webpack').Configuration} config The config to use.
     * @returns {any} The nextjs webpack config changed.
     */
    webpack(config) {
        const isDev = phase === PHASE_DEVELOPMENT_SERVER;

        config.module.rules.push({
            test: /\.ttf|\.woff2/u,
            type: 'asset/resource'
        });

        if (isDev) {
            config.plugins.push(new DuplicatePackageCheckerPlugin({
                /**
                 * Excludes packages from checking.
                 *
                 * @param {object} instance The module instance object.
                 * @returns {boolean} True if the package should be excluded.
                 */
                exclude(instance) {
                    return instance.name === 'react-is';
                }
            }));
        }

        config.plugins.push(new WatchFontsConfigPlugin({
            globalStylesPath: './src/client/ui/utils/globalStyles.ts',
            outputPath: './src/client/ui/assets/fonts/fonts.css'
        }));

        return config;
    }
});

module.exports = phase => withBundleAnalyzer(
    withFeatureFlags(
        withAliases(
            withCors(
                withPayload(nextConfig(phase)),
                {phase}
            )
        ),
        {phase}
    )
);