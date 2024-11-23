const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

/**
 * @type {Array<string>} The cors definitions.
 */
const corsDev = [
    'default-src \'unsafe-eval\' blob:',
    'base-uri \'self\'',
    'connect-src \'self\'',
    'font-src \'self\' https: data:',
    'form-action \'self\'',
    'frame-ancestors \'self\' https: http:',
    'frame-src \'self\'',
    'img-src \'self\' data: https: blob:',
    'media-src \'self\' data: https: blob:',
    'object-src \'none\'',
    'script-src \'self\' \'unsafe-eval\' \'unsafe-inline\' blob:',
    'script-src-attr \'none\'',
    'style-src \'self\' https: \'unsafe-inline\'',
    'block-all-mixed-content'
];

/**
 * @type {Array<string>} The cors definitions.
 */
const corsProd = [
    'default-src \'unsafe-eval\' blob:',
    'base-uri \'self\'',
    'connect-src \'self\'',
    'font-src \'self\' https: data:',
    'form-action \'self\'',
    'frame-ancestors \'self\'',
    'frame-src \'self\'',
    'img-src \'self\' data: https: blob:',
    'media-src \'self\' data: https: blob:',
    'object-src \'none\'',
    'script-src \'self\' \'unsafe-eval\' \'unsafe-inline\' blob:',
    'script-src-attr \'none\'',
    'style-src \'self\' https: \'unsafe-inline\'',
    'block-all-mixed-content'
];

/**
 * Plugin for cors.
 *
 * @param {import('next').NextConfig} nextConfig    The next config.
 * @param {object}                    options       The options.
 * @param {string}                    options.phase The phase.
 *
 * @returns {import('next').NextConfig} The next config.
 */
module.exports = (nextConfig, {phase}) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    const oldHeaders = nextConfig.headers;

    // eslint-disable-next-line no-param-reassign
    nextConfig.headers = async () => {
        const headers = await oldHeaders?.() ?? [];

        headers.push({
            headers: [
                {
                    key: 'Content-Security-Policy',
                    value: isDev ? corsDev.join(';') : corsProd.join(';')
                }
            ],
            source: '/(.*)'
        });

        return headers;
    };

    return nextConfig;
};