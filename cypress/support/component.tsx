import '../../src/client/ui/assets/fonts/fonts';

// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Code coverage
import '@cypress/code-coverage/support';
import 'cypress-real-events';
// Import commands.js using ES2015 syntax:
import './commands';
import '@nfq/colors/cypress';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import type {ReactNode} from 'react';

import {mount, type MountReturn} from 'cypress/react';

import {TestWrapper, type TestWrapperProps} from 'Tests/support/TestWrapper';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Mounts a React node into the Cypress component testing runner.
             * This declaration augments Cypress with a typed command that wraps the component in the test environment.
             * It ensures the mounted component can be interacted with using Cypress chainable APIs.
             *
             * @param component The React node to be mounted for the test.
             * @param options   Additional options to control mounting, including wrapper props.
             * @returns A Cypress chainable containing the mount result for further commands.
             *
             * @example
             * ```tsx
             * cy.mount(<MyComponent />, {wrapperProps: {theme: 'dark'}});
             * ```
             */
            mount(
                component: ReactNode,
                options?: {wrapperProps?: TestWrapperProps}
            ): Chainable<MountReturn>;
        }
    }
}

Cypress.Commands.add('mount', (component, options = {}) => {
    const {wrapperProps} = options;

    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapped = <TestWrapper {...wrapperProps}>{component}</TestWrapper>;

    return mount(wrapped);
});

// Example use:
// cy.mount(<MyComponent />)