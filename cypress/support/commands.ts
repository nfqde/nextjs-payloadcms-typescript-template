/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import 'cypress/react';
import type {ReactElement, ReactNode} from 'react';

import color from 'onecolor';
import gradient, {type GradientObject} from 'webskit-gradient-parser';

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

Cypress.Commands.add('getCy', value => cy.get(`[data-cy="${value}"]`));

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
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
            // eslint-disable-next-line no-underscore-dangle
            (this._obj as HTMLElement[])[0].tagName.toLowerCase() === tagName.toLowerCase(),
            `expected #{this} to be HtmlElement ${tagName.toLowerCase()}`,
            `expected #{this} to not be HtmlElement ${tagName.toLowerCase()}`,
            // eslint-disable-next-line no-invalid-this, no-underscore-dangle
            this._obj
        );
    }

    chai.Assertion.addMethod('htmlElement', assertHtmlElement);
};

/**
 * A Chai assertion utility for checking if a given RGB color is considered "dark".
 * This function adds a custom assertion method `dark` to Chai, which calculates
 * the luminance of an RGB color and asserts whether it falls below the dark color threshold.
 *
 * @param chai The Chai assertion library instance.
 *
 * @example
 * ```tsx
 * chai.use(hasDarkColor);
 * expect('rgb(50, 50, 50)').to.be.dark;
 * ```
 */
const hasDarkColor = (chai: Chai.ChaiStatic) => {
    /**
     * Asserts that the given RGB color string is classified as a "dark" color.
     * The determination is based on the luminance formula:
     * `luma = 0.2126 * R + 0.7152 * G + 0.0722 * B`
     * If the luma value is below `131`, the color is considered dark.
     *
     * @param this The Chai assertion context.
     *
     * @example
     * ```tsx
     * expect('rgb(20, 20, 20)').to.be.dark;
     * ```
     */
    function assertRbaColor(this: Chai.AssertionStatic) {
        // eslint-disable-next-line no-underscore-dangle
        const [r, g, b] = (this._obj as string).replace('rgb(', '').replace(')', '').split(',');

        // eslint-disable-next-line @nfq/no-magic-numbers
        const luma = 0.2126 * parseInt(r, 10) + 0.7152 * parseInt(g, 10) + 0.0722 * parseInt(b, 10);

        this.assert(
            // eslint-disable-next-line @nfq/no-magic-numbers
            (luma < 131),
            'expected #{this} to be an dark color',
            'expected #{this} not to be an dark color',
            // eslint-disable-next-line no-invalid-this, no-underscore-dangle
            this._obj
        );
    }

    chai.Assertion.addMethod('dark', assertRbaColor);
};

/**
 * A Chai assertion utility for comparing the luminance of two RGB colors.
 * This function adds a custom assertion method `darker` to Chai, allowing tests to check
 * if one color is darker than another based on their luminance values.
 *
 * @param chai The Chai assertion library instance.
 *
 * @example
 * ```tsx
 * chai.use(hasDarkerColor);
 * expect('rgb(50, 50, 50)').to.be.darker('rgb(100, 100, 100)');
 * ```
 */
const hasDarkerColor = (chai: Chai.ChaiStatic) => {
    /**
     * Asserts that the given RGB color is darker than another specified color.
     * The darkness is determined by calculating the luminance of each color
     * using the formula:
     * `luma = 0.2126 * R + 0.7152 * G + 0.0722 * B`
     * The color is considered darker if its computed luminance is lower than the compared color.
     *
     * @param this       The Chai assertion context.
     * @param otherColor The RGB color string to compare against.
     *
     * @example
     * ```tsx
     * expect('rgb(20, 20, 20)').to.be.darker('rgb(80, 80, 80)');
     * ```
     */
    function assertRbaColor(this: Chai.AssertionStatic, otherColor: string) {
        // eslint-disable-next-line no-underscore-dangle
        const [r, g, b] = (this._obj as string).replace('rgb(', '').replace(')', '').split(',');
        const [or, og, ob] = otherColor.replace('rgb(', '').replace(')', '').split(',');
        // eslint-disable-next-line @nfq/no-magic-numbers
        const luma = 0.2126 * parseInt(r, 10) + 0.7152 * parseInt(g, 10) + 0.0722 * parseInt(b, 10);
        // eslint-disable-next-line @nfq/no-magic-numbers
        const otherLuma = 0.2126 * parseInt(or, 10) + 0.7152 * parseInt(og, 10) + 0.0722 * parseInt(ob, 10);

        this.assert(
            // eslint-disable-next-line @nfq/no-magic-numbers
            (luma < otherLuma),
            `expected #{this} to be an darker color as ${otherColor}`,
            `expected #{this} not to be an darker color as ${otherColor}`,
            // eslint-disable-next-line no-invalid-this, no-underscore-dangle
            this._obj
        );
    }

    chai.Assertion.addMethod('darker', assertRbaColor);
};

/**
 * A Chai assertion utility for checking if two colors are equal.
 * This function adds a custom assertion method `colored` to Chai, allowing tests to verify
 * if a given color matches an expected color, including CSS variables.
 *
 * @param chai The Chai assertion library instance.
 *
 * @example
 * ```tsx
 * chai.use(ColorsEqual);
 * expect('rgb(255, 0, 0)').to.be.colored('rgb(255, 0, 0)'); // Direct color comparison
 * expect('rgb(255, 0, 0)').to.be.colored('var(--primary-color)'); // CSS variable comparison
 * ```
 */
const ColorsEqual = (chai: Chai.ChaiStatic) => {
    /**
     * Asserts that the given color matches an expected color.
     * The comparison supports both direct color values (e.g., `rgb(255, 0, 0)`, `#ff0000`)
     * and CSS variables (`var(--primary-color)`), resolving the actual color from the document.
     *
     * @param this        The Chai assertion context.
     * @param colorString The expected color string, which can be a direct color or a CSS variable.
     *
     * @example
     * ```tsx
     * expect('rgb(0, 128, 0)').to.be.colored('green'); // Direct match
     * expect('rgb(0, 128, 0)').to.be.colored('var(--success-color)'); // Resolving a CSS variable
     * ```
     */
    function assertColors(this: Chai.AssertionStatic, colorString: string) {
        const actual = color(this._obj as string);

        if (colorString.includes('var(')) {
            const colorVar = colorString.replace('var(', '').replace(')', '');

            cy.document().then(doc => {
                const trueColor = window.getComputedStyle(doc.body).getPropertyValue(colorVar).trim();
                const expected = color(trueColor);

                this.assert(
                    actual ? actual.equals(expected) : false,
                    'expected #{act} to be the same color as #{exp}',
                    'expected #{act} to be a different color than #{exp}',
                    expected ? expected.hex() : undefined,
                    actual ? actual.hex() : undefined
                );
            });
        } else {
            const expected = color(colorString);

            this.assert(
                actual ? actual.equals(expected) : false,
                'expected #{act} to be the same color as #{exp}',
                'expected #{act} to be a different color than #{exp}',
                expected ? expected.hex() : undefined,
                actual ? actual.hex() : undefined
            );
        }
    }

    chai.Assertion.addMethod('colored', assertColors);
};

/**
 * A Chai assertion utility for comparing gradients.
 * This function adds a custom assertion method `gradient` to Chai, allowing tests to verify
 * whether the colors in a gradient match the expected colors, including CSS variables.
 *
 * @param chai The Chai assertion library instance.
 *
 * @example
 * ```tsx
 * chai.use(GradientsEqual);
 * expect('linear-gradient(rgb(255, 0, 0), rgb(0, 0, 255))').to.be.gradient(['rgb(255, 0, 0)', 'rgb(0, 0, 255)']);
 * expect('linear-gradient(var(--primary-color), var(--secondary-color))').to.be.gradient(['var(--primary-color)', 'var(--secondary-color)']);
 * ```
 */
const GradientsEqual = (chai: Chai.ChaiStatic) => {
    /**
     * Asserts that a given gradient matches an expected set of colors.
     * This assertion supports both direct color values (e.g., `rgb(255, 0, 0)`, `#ff0000`)
     * and CSS variables (`var(--primary-color)`), resolving the actual colors from the document.
     *
     * @param this           The Chai assertion context.
     * @param expectedColors An array of expected color strings, which can be direct colors or CSS variables.
     *
     * @example
     * ```tsx
     * expect('linear-gradient(rgb(0, 255, 0), rgb(0, 0, 255))')
     *     .to.be.gradient(['rgb(0, 255, 0)', 'rgb(0, 0, 255)']);
     *
     * expect('linear-gradient(var(--start-color), var(--end-color))')
     *     .to.be.gradient(['var(--start-color)', 'var(--end-color)']);
     * ```
     */
    function assertGradient(this: Chai.AssertionStatic, expectedColors: string[]) {
        const gradientStops = (JSON.parse(gradient.parse(this._obj as string)) as GradientObject).stops;

        cy.document().then(doc => {
            const compareArray = [];

            for (let i = 0; i < gradientStops.length; i++) {
                const actual = color(gradientStops[i][0]);

                if (expectedColors[i].includes('var(')) {
                    const colorVar = expectedColors[i].replace('var(', '').replace(')', '');
                    const trueColor = window.getComputedStyle(doc.body).getPropertyValue(colorVar).trim();
                    const expected = color(trueColor);

                    compareArray.push({
                        actual: (actual) ? actual.hex() : undefined,
                        cond: (actual) ? actual.equals(expected) : false,
                        expected: (expected) ? expected.hex() : undefined
                    });
                } else {
                    const expected = color(expectedColors[i]);

                    compareArray.push({
                        actual: (actual) ? actual.hex() : undefined,
                        cond: (actual) ? actual.equals(expected) : false,
                        expected: (expected) ? expected.hex() : undefined
                    });
                }
            }

            this.assert(
                compareArray.every(({cond}) => cond),
                'expected #{act} to be the same color as #{exp}',
                'expected #{act} to be a different color than #{exp}',
                compareArray.map(({expected}) => expected).join(', '),
                compareArray.map(({actual}) => actual).join(', ')
            );
        });
    }

    chai.Assertion.addMethod('gradient', assertGradient);
};

chai.use(isHtmlElement);
chai.use(hasDarkColor);
chai.use(hasDarkerColor);
chai.use(ColorsEqual);
chai.use(GradientsEqual);