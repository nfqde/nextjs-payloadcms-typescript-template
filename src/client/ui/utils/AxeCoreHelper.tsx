import React, {useEffect, useRef} from 'react';

import {reportAccessibility} from 'UI/utils/axeCore';

// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout;

/**
 * The `AxeCoreHelper` component is a functional component designed to observe mutations on the `body` of the document and report accessibility issues using the Axe-Core library.
 * It utilizes a `MutationObserver` to watch for changes in the DOM and triggers the accessibility report after a delay once mutations are detected.
 * This component is crucial for maintaining accessibility standards within the application by identifying and reporting accessibility issues in real-time during development.
 *
 * @returns A `null` value as this component does not render any visible elements in the DOM but performs its functionality in the background.
 *
 * @example
 * ```tsx
 * <AxeCoreHelper />
 * ```
 */
const AxeCoreHelper = () => {
    const observer = useRef(new MutationObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            // eslint-disable-next-line @nfq/no-magic-numbers
            await reportAccessibility(React);
        }, 1000);
    }));

    useEffect(() => {
        void reportAccessibility(React);

        const currentObserver = observer.current;

        currentObserver.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true
        });

        return () => currentObserver.disconnect();
    }, []);

    return null;
};

AxeCoreHelper.displayName = 'AxeCoreHelper';

export default AxeCoreHelper;