import {useCallback, useRef} from 'react';

const DEFAULT_TIMEOUT = 100;

/**
 * The `useDebounce` hook is designed to delay the invocation of a function until after a certain amount of time has passed since the last time the debounced function was invoked.
 * It is useful for implementing behaviors that should only trigger after a delay, such as search input filtering or resizing events, to optimize performance.
 * This hook is crucial for preventing the rapid firing of functions, especially in scenarios where some delay is desirable to avoid overwhelming the system or making excessive API calls.
 *
 * @param func    A function to be debounced. It can accept any number of arguments.
 * @param timeout An optional number representing the amount of time (in milliseconds) to delay the invocation of the function. Defaults to `100ms`.
 * @returns A debounced version of the provided function, which can be invoked with any arguments. The actual invocation of the function will be delayed by the specified timeout.
 *
 * @example
 * ```tsx
 * const debouncedSave = useDebounce(saveData, 300);
 * ```
 */
export const useDebounce = (func: (...args: any[]) => void, timeout = DEFAULT_TIMEOUT) => {
    // eslint-disable-next-line no-undef
    const timer = useRef<NodeJS.Timeout>();

    return useCallback((...args: unknown[]) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => func(...args), timeout);
    }, [func, timeout]);
};