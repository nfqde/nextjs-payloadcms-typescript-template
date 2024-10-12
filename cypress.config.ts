import coverage from '@cypress/code-coverage/task';
import {loadEnvConfig} from '@next/env';
import {defineConfig} from 'cypress';

import resetDB from './cypress/tasks/resetDB';
import seedDB from './cypress/tasks/seedDB';

const {combinedEnv} = loadEnvConfig(process.cwd());

export default defineConfig({
    component: {
        devServer: {
            bundler: 'webpack',
            framework: 'next'
        },
        reporter: 'mochawesome',
        reporterOptions: {
            html: false,
            json: true,
            overwrite: false,
            reportDir: 'cypress/reports'
        },
        video: false,
        /**
         * Sets up plugins and so on.
         *
         * @param on     Cypress event handler.
         * @param config Cypress configuration.
         * @returns Cypress configuration.
         */
        setupNodeEvents(on, config) {
            coverage(on, config);

            return config;
        }
    },
    e2e: {
        baseUrl: 'http://localhost:3000',
        retries: {runMode: 3},
        screenshotOnRunFailure: false,
        video: false,
        viewportHeight: 1080,
        viewportWidth: 1920,
        /**
         * Sets up plugins and so on.
         *
         * @param on     Cypress event handler.
         * @param config Cypress configuration.
         */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setupNodeEvents(on, config) {
            on('task', {
                resetDB,
                seedDB
            });
        }
    },
    env: {
        ...combinedEnv,
        codeCoverage: {exclude: ['cypress/**/*.*']}
    },
    video: false
});