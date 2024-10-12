/* eslint-disable node/prefer-promises/fs, security/detect-non-literal-fs-filename, promise/prefer-await-to-callbacks */
// @ts-check
const fs = require('fs');

/**
 * Get paths to files for mutation testing.
 *
 * @returns {string[]} The paths to the files.
 */
const getPaths = () => {
    const files = fs.readdirSync('./cypress/component', {
        recursive: true,
        withFileTypes: true
    });

    const globPaths = files.map(file => {
        if (file.isDirectory()) return null;

        const namePattern = file.name.replace(/\.cy\.tsx?$/gu, '{.ts,.tsx}');
        const pathPattern = file.path.replace(/\\/gu, '/').replace('cypress/component', 'src/client');

        return `${pathPattern}/${namePattern}`;
    }).filter(Boolean);

    return globPaths;
};

/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
module.exports = {
    commandRunner: {command: 'cross-env NODE_ENV=test yarn cypress run --component'},
    concurrency: 1,
    coverageAnalysis: 'off',
    disableTypeChecks: true,
    incremental: true,
    inPlace: true,
    mutate: getPaths(),
    packageManager: 'yarn',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'command'
};