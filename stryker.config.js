const {makeConfig} = require('@nfq/cypress-stryker-runner/stryker');

module.exports = makeConfig(
    {
        htmlReporter: {fileName: 'cypress/reports/stryker/mutation.html'},
        ignorePatterns: [
            'reports/**',
            '.next/**',
            '.git/**',
            '.stryker-tmp/**',
            'coverage/**',
            '.nyc_output/**',
            'cypress/reports/**'
        ],
        jsonReporter: {fileName: 'cypress/reports/stryker/mutation.json'}
    },
    {
        extensions: ['ts', 'tsx'],
        root: __dirname,
        sourceRoot: 'src',
        specExtensions: ['ts', 'tsx'],
        specRoot: 'cypress/component'
    }
);