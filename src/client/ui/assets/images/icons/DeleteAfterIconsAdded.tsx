/* eslint-disable max-len */
import React from 'react';

/**
 * The `DeleteAfterIconsAddedProps` interface defines the shape of the properties object that is expected for this component.
 * It outlines the required properties that needs to be provided when utilizing this component expecting an object of this type.
 */
interface DeleteAfterIconsAddedProps {
    /**
     * A string representing the CSS class to be applied to the DeleteAfterIconsAddedIcon element to override its default styling.
     *
     * @default ''
     */
    className?: string;
    /**
     * A string representing the color to be applied.
     *
     * @default '#212325'
     */
    color1?: string;
    /**
     * A number or string representing the height of the DeleteAfterIconsAddedIcon element.
     *
     * @default undefined
     */
    height?: number | string;
    /**
     * The `testId` property represents a unique identifier, usually in the form of a string, assigned to a component for testing purposes.
     * This property is crucial for uniquely identifying components during testing, allowing for more accurate and reliable tests.
     *
     * @default 'DeleteAfterIconsAdded'
     */
    testId?: string;
    /**
     * A number or string representing the height of the DeleteAfterIconsAddedIcon element.
     *
     * @default undefined
     */
    width?: number | string;
}

/**
 * The `DeleteAfterIconsAdded` component is a functional component designed to render a customizable SVG element representing an Icon.
 * It receives several props through the `DeleteAfterIconsAddedProps` interface, allowing for customization of class, color, dimensions, and testing identifier.
 *
 * @param props           The component props.
 * @param props.className A string representing the CSS class to be applied to the DeleteAfterIconsAddedIcon element to override its default styling.
 * @param props.height    A number or string representing the height of the DeleteAfterIconsAddedIcon element.
 * @param props.testId    A string representing a unique identifier assigned to the component for testing purposes.
 * @param props.width     A number or string representing the height of the DeleteAfterIconsAddedIcon element.
 * @returns A React element representing the `Check` component with the specified properties.
 *
 * @example
 * ```tsx
 * const DeleteAfterIconsAddedComponent = <DeleteAfterIconsAdded className="myClass" color1="#000" height="20" testId="myTestId" width="20" />;
 * ```
 */
export const DeleteAfterIconsAdded = React.forwardRef<SVGSVGElement, DeleteAfterIconsAddedProps>((props, ref) => {
    const {className = '', color1 = '#212325', height = 360.65, testId = 'DeleteAfterIconsAdded', width = 383.55} = props;

    return (
        <svg
            ref={ref}
            className={className}
            data-cy={testId}
            height={height}
            viewBox="0 0 383.55 360.65"
            width={width}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <path d="M383.55.3v270c-1.99.1-3.98.28-5.96.28l-370.52.01c-1.25 0-2.5-.08-3.74 0-2.38.15-3.47-.87-3.31-3.29.07-1.12 0-2.25 0-3.37V6.69c0-1.12.08-2.25 0-3.37C-.15.89.95-.15 3.33.02c.99.07 2 0 2.99 0l372.01.01c1.74 0 3.48.18 5.21.28ZM124.31 225.01c2.49 0 4.99-.1 7.48.03 2.76.14 3.77-1.06 3.74-3.78-.06-4.74-.33-9.55.27-14.22 3.41-26.68 26.03-48.01 51.33-49.55 32.09-1.95 54.73 20.13 60.03 44.14 1.42 6.44 1.2 12.91 1.16 19.39-.02 2.84.9 4.13 3.88 4.03q7.1-.22 14.21 0c2.99.1 3.84-1.21 3.88-4.04q.12-8.64-.89-17.2c-4.99-42.41-46.06-73.65-88.35-67.35-37.82 5.63-69.89 37.93-67.45 85.43.11 2.22 1.06 3.16 3.23 3.12 2.49-.05 4.99-.01 7.48 0M109.06 48.58c-1.15-.07-1.66.51-2.18 1.03-3.89 3.88-7.73 7.81-11.66 11.64-1.43 1.39-1.33 2.51.08 3.74q.7.62 1.32 1.33c3.83 4.38 8.82 7.68 11.83 12.82-3.23 4.97-8.07 8.43-11.96 12.77q-.37.43-.79.79c-1.86 1.49-1.95 2.82-.09 4.56q5.47 5.12 10.58 10.6c1.77 1.89 3.02 2.02 4.85.08 3.59-3.82 7.44-7.39 11.06-11.18 1.79-1.87 3.16-1.88 4.95 0 3.62 3.79 7.47 7.36 11.06 11.18 1.82 1.94 3.07 1.84 4.85-.06q5.11-5.48 10.58-10.6c1.84-1.73 1.77-3.06-.08-4.57-.48-.39-.91-.86-1.32-1.32-3.71-4.17-8.4-7.43-11.43-12.24 2.8-4.99 7.66-8.08 11.3-12.29.41-.47.84-.94 1.32-1.32 2.01-1.59 2.06-3 .08-4.84-3.65-3.4-7.16-6.96-10.59-10.6-1.66-1.77-2.87-1.86-4.57-.06-3.7 3.89-7.61 7.57-11.33 11.44-1.67 1.74-3 1.74-4.67 0-3.63-3.78-7.38-7.45-11.11-11.14-.69-.69-1.49-1.27-2.06-1.76Zm180.68 14.59c-.03-1.14-.94-1.71-1.63-2.4-3.34-3.37-6.82-6.6-10.01-10.12-2.04-2.26-3.5-2.51-5.66-.12-3.35 3.7-7.09 7.04-10.51 10.67-1.87 1.98-3.3 2.09-5.23.05-3.68-3.9-7.6-7.59-11.34-11.44-1.45-1.5-2.55-1.52-4.02.02a343 343 0 0 1-11.12 11.13c-1.68 1.6-1.6 2.75.01 4.31 3.77 3.64 7.34 7.5 11.16 11.08 2.19 2.05 2.01 3.55-.08 5.52-3.73 3.51-7.21 7.27-10.9 10.81-1.68 1.61-2.01 2.81-.13 4.58q5.6 5.25 10.85 10.87c1.77 1.9 2.98 1.52 4.57-.15 3.54-3.7 7.3-7.18 10.79-10.92 1.98-2.11 3.47-2.24 5.5-.06 3.58 3.83 7.43 7.4 11.06 11.19 1.56 1.63 2.71 1.66 4.3 0q5.27-5.58 10.85-10.86c1.81-1.7 1.74-2.92 0-4.59-3.7-3.53-7.15-7.33-10.91-10.81-2.33-2.16-2.14-3.72.08-5.79 3.65-3.4 7.09-7.03 10.61-10.58.69-.7 1.55-1.29 1.73-2.38Zm-97.83 297.42H95.74c-5.13 0-5.14-.03-5.15-5.19-.01-4.62.15-9.25-.05-13.87-.13-3.15 1.11-4.08 4.14-4.05 12.85.12 25.7-.08 38.54.12 3.56.06 5.06-1.17 5.86-4.59 2.89-12.27 6.13-24.47 9.05-36.73.68-2.86 2-3.81 4.87-3.8 25.94.08 51.89.1 77.83-.02 3.18-.01 4.31 1.28 4.99 4.14 2.91 12.14 6.11 24.22 8.97 36.37.8 3.39 2.27 4.68 5.85 4.63 12.72-.2 25.45.02 38.17-.14 3.39-.04 4.67 1.01 4.5 4.48q-.36 7.12 0 14.24c.17 3.46-1.1 4.5-4.49 4.48-19.08-.13-38.17-.06-57.25-.06h-39.66Z" fill={color1} />
        </svg>
    );
});

DeleteAfterIconsAdded.displayName = 'DeleteAfterIconsAdded';