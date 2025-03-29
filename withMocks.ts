/* eslint-disable no-param-reassign, security/detect-non-literal-regexp, security/detect-object-injection */
import path from 'path';

import {type Configuration, NormalModuleReplacementPlugin} from 'webpack';

import type {StorybookConfig} from '@storybook/nextjs';

const mocks: string[] = [];

/**
 * Add mocks to the webpack configuration.
 * This is used to replace the original module with a mock module.
 * For example, if you have a module `Application/useCases/useContractsData`,.
 *
 * @param config The webpack configuration object.
 * @returns The modified webpack configuration object.
 */
export const addMocks = (config: Configuration | Parameters<NonNullable<StorybookConfig['webpackFinal']>>[0]) => {
    config.resolve ??= {};
    config.resolve.alias ??= {};
    config.plugins ??= [];

    mocks.forEach(alias => {
        const aliasPathParts = alias.split('/');
        const realAlias = aliasPathParts[0];
        // @ts-expect-error
        const aliasRoot = config.resolve!.alias![realAlias] as string;

        aliasPathParts.shift();
        const fileName = aliasPathParts.pop();
        const subPath = [...aliasPathParts, fileName, fileName].join('/');

        config.plugins!.push(
            // @ts-expect-error
            new NormalModuleReplacementPlugin(
                new RegExp(`^${alias}`, 'u'),
                path.resolve(aliasRoot, `${subPath}.mock.ts`)
            )
        );
    });

    return config;
};