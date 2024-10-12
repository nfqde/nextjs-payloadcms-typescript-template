const featureFlags = require('@nfq/feature-flags/eslint/import')(['@app/features', '@nfq/feature-flags/jsx']);

// eslint-disable-next-line import/extensions
const {withAliasesEslint} = require('./withAliases');

module.exports = {
    extends: ['@nfq', 'plugin:storybook/recommended'],
    ignorePatterns: ['src/app/(payload)/*'],
    root: true,
    rules: {...featureFlags.rules},
    settings: {'import/resolver': withAliasesEslint()}
};