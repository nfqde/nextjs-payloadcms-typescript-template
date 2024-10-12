import type {ComponentType} from 'react';

import ReactDOMServer from 'react-dom/server';

/**
 * The `iconAsBackground` function is designed to convert a React component representing an icon into a data URI string that can be used as a background image in CSS.
 * It takes a `ComponentType` representing the icon and an optional props object to be spread into the icon component.
 * This function is crucial for dynamically generating background images in styles, allowing for greater flexibility and customization in styling components.
 *
 * @param Icon  A `ComponentType` representing the React component of the icon to be converted.
 * @param props An optional object representing the props to be spread into the icon component.
 * @returns      A string representing the data URI of the rendered icon, which can be used as a background image in CSS.
 *
 * @example
 * ```tsx
 * const backgroundImage = iconAsBackground(MyIcon, { color: 'red' });
 * ```
 */
export const iconAsBackground = (Icon: ComponentType, props: object): string => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    // eslint-disable-next-line react/jsx-filename-extension, react/jsx-props-no-spreading
    ReactDOMServer.renderToStaticMarkup(<Icon {...props} />)
)}`;