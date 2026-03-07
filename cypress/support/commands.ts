/* eslint-disable no-underscore-dangle */
import 'cypress/react';
import type {ReactElement, ReactNode} from 'react';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', {prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.addQuery('getCy', selector => {
    const getFn = cy.now('get', `[data-cy="${selector}"]`);

    if (typeof getFn !== 'function') {
        throw new Error(`getCy: ${selector} is not a valid selector`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return subject => getFn(subject);
});

Cypress.Commands.add('mountHook', hook => {
    const hookValues = {current: null};

    /**
     * Mock component to mount the hook.
     *
     * @param props          Props given to the component.
     * @param props.children Function to render the hook.
     * @returns Null.
     */
    const MockComponent = ({children}: {children?(data: ReturnType<typeof hook>): ReactNode}): ReactElement => {
        hookValues.current = hook();

        if (typeof children === 'function') {
            return children(hookValues.current) as unknown as ReactElement;
        }

        return null as unknown as ReactElement;
    };

    return cy.wrap({
        MockComponent,
        values: hookValues
    });
});

Cypress.Commands.add('mountHooks', (...args) => {
    const hookValues: {current: any[] | null} = {current: null};

    /**
     * Mock component to mount the hook.
     *
     * @param props          Props given to the component.
     * @param props.children Function to render the hook.
     * @returns Null.
     */
    const MockComponent = (
        {children}: {children?(data: ReturnType<typeof args[number]>[]): ReactNode}
    ): ReactElement => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        hookValues.current = args.map(hook => hook());

        if (typeof children === 'function') {
            return children(hookValues.current) as unknown as ReactElement;
        }

        return null as unknown as ReactElement;
    };

    return cy.wrap({
        MockComponent,
        values: hookValues
    });
});

/**
 * A Chai assertion utility for checking if an element is an HTML element with a specific tag name.
 * This function adds a custom assertion method `htmlElement` to Chai, allowing tests to verify
 * that the first element in an assertion array has the specified HTML tag.
 *
 * @param chai The Chai assertion library instance.
 *
 * @example
 * ```tsx
 * chai.use(isHtmlElement);
 * expect(document.querySelectorAll('div')).to.be.htmlElement('div');
 * ```
 */
const isHtmlElement = (chai: Chai.ChaiStatic) => {
    /**
     * Asserts that the first element in the assertion object is an HTML element of the specified tag.
     *
     * @param this    The Chai assertion context.
     * @param tagName The expected tag name to check against.
     *
     * @example
     * ```tsx
     * expect(document.querySelectorAll('button')).to.be.htmlElement('button');
     * ```
     */
    function assertHtmlElement(this: Chai.AssertionStatic, tagName: string) {
        this.assert(
            (this._obj as HTMLElement[])[0].tagName.toLowerCase() === tagName.toLowerCase(),
            `expected #{this} to be HtmlElement ${tagName.toLowerCase()}`,
            `expected #{this} to not be HtmlElement ${tagName.toLowerCase()}`,
            this._obj
        );
    }

    chai.Assertion.addMethod('htmlElement', assertHtmlElement);
};

chai.use(isHtmlElement);