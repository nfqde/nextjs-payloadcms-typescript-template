import styled from '@emotion/styled';
import {AnimatePresence} from 'motion/react';
import * as motion from 'motion/react-m';
import Head from 'next/head';

import {LayoutTransition} from 'UI/animations/layout';

import type {WithChildren} from 'types/global';

/**
 * The `ComponentProps` interface defines the shape of the properties object that is expected for this component.
 * It outlines the required properties that needs to be provided when utilizing this component expecting an object of this type.
 */
interface ComponentProps {
    /**
     * The `layoutKey` property represents a unique key used to identify the layout.
     * This key can be useful for animations or transitions, allowing the application to determine if the layout has changed between different pages.
     */
    route: string;
    /**
     * The `testId` property represents a unique identifier, usually in the form of a string, assigned to a component for testing purposes.
     * This property is crucial for uniquely identifying components during testing, allowing for more accurate and reliable tests.
     *
     * @default 'AppLayout'
     */
    testId?: string;
    /**
     * The `title` property represents the title of the page.
     * This title will be displayed in the document head, providing a meaningful title for the page.
     * This property is essential for SEO and user experience, as it helps users understand the content of the page at a glance.
     */
    title: string;
}

/**
 * The `AppLayout` Component.
 *
 * @param props           The component props.
 * @param props.testId    A unique identifier, usually in the form of a string, assigned to the component for testing purposes.
 * @param props.children  The children of the component, which can be any valid React node.
 * @param props.title     The title of the page, which will be displayed in the document head.
 * @param props.layoutKey A unique key used to identify the layout, which can be useful for animations or transitions.
 * @param props.route     The current route of the application, which can be used for navigation or routing purposes.
 * @returns A React element representing the `AppLayout` component.
 *
 * @example
 * ```tsx
 * const MyComponent = <AppLayout testId="myTestId">MyComponent</AppLayout>;
 * ```
 */
const AppLayout = ({children, route, testId = 'AppLayout', title}: WithChildren<ComponentProps>) => (
    <Wrapper data-cy={testId}>
        <Head>
            <title>{title}</title>
        </Head>
        <AnimatePresence initial={false} mode="wait" propagate>
            <Content
                key={route}
                variants={LayoutTransition}
            >
                {children}
            </Content>
        </AnimatePresence>
    </Wrapper>
);

AppLayout.displayName = 'AppLayout';

export {AppLayout};

const Wrapper = styled.div`
    scrollbar-gutter: stable;
`;

const Content = styled(motion.main)``;