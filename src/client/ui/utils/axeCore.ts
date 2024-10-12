import type React from 'react';

/**
 * The `reportAccessibility` function is designed to perform accessibility reporting using the Axe-Core library for the given React Application when in a non-production environment.
 * It dynamically imports the necessary libraries and performs the accessibility check, allowing developers to identify and address accessibility issues during the development phase.
 * This function is crucial for maintaining high accessibility standards within the application by providing real-time feedback on potential accessibility concerns.
 *
 * @param App    A reference to the React object of the application for which the accessibility report is to be generated.
 * @param config An optional configuration object to customize the behavior of the Axe-Core library during the accessibility check.
 * @returns A Promise that resolves to `void` once the accessibility report has been generated.
 *
 * @example
 * ```tsx
 * await reportAccessibility(React, {rules: {'color-contrast': {enabled: false}}});
 * ```
 */
export const reportAccessibility = async (App: typeof React, config?: Record<string, unknown>): Promise<void> => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
        const axe = await import(
            /* webpackChunkName: "axe-core" */
            '@axe-core/react'
        );
        const ReactDOM = await import(
            /* webpackChunkName: "react-dom" */
            'react-dom'
        );

        // eslint-disable-next-line @nfq/no-magic-numbers
        await axe.default(App, ReactDOM, 1000, config);
    }
};