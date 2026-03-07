import React, {useEffect, useRef} from 'react';

import {reportAccessibility} from 'UI/utils/axeCore';

/**
 * Provides a React hook that triggers accessibility reporting using axe-core.
 * It sets up a mutation observer that throttles reports when DOM changes occur.
 * It also runs an initial report on mount and cleans up the observer on unmount.
 *
 * @example
 * ```tsx
 * useAxeCoreHelper();
 * ```
 */
export const useAxeCoreHelper = () => {
    const timer = useRef<NodeJS.Timeout>(undefined);
    const observer = useRef(new MutationObserver(() => {
        clearTimeout(timer.current);
        timer.current = setTimeout(async () => {
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
};