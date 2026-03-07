import {useAxeCoreHelper} from 'UI/utils/AxeCoreHelper/useAxeCoreHelper';

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
    useAxeCoreHelper();

    return null;
};

AxeCoreHelper.displayName = 'AxeCoreHelper';

export default AxeCoreHelper;