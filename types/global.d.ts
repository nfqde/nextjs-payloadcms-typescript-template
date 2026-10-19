/* eslint-disable @stylistic/max-len */
import type {ReactElement, ReactNode} from 'react';

import type {
    InferGetServerSidePropsType,
    InferGetStaticPropsType,
    NextComponentType,
    NextPage,
    NextPageContext
} from 'next';
import type {AppProps as NextAppProps} from 'next/app';

type NextComponentWithLayout = NextComponentType<NextPageContext, any, any> & Partial<NextPageWithLayout>;
type NextPageWithLayout<T = any> = NextPage<T> & Layout<T>;
type NextSSRPageWithLayout<P = any> = NextPage<InferGetServerSidePropsType<P>> & Layout<InferGetServerSidePropsType<P>>;
type NextSSGPageWithLayout<P = any> = NextPage<InferGetStaticPropsType<P>> & Layout<InferGetStaticPropsType<P>>;

export type AppProps<P = any> = Omit<NextAppProps<P>, 'pageProps'> & {
    Component: NextComponentWithLayout;
    pageProps: P;
};
export interface Layout<T> {
    getLayout?: GetLayout<T>;
    getLayoutKey?: GetLayoutKey;
}

export type GetLayout<T> = (route: string, pageProps: T, PageComponent: NextComponentWithLayout) => ReactNode;
export type GetLayoutKey = () => string;

export type WithOptionalChildren<T = Record<string, never>> = T & {children?: ReactNode};
export type WithMultipleChildren<T = Record<string, never>> = T & {children: ReactElement[]};
export type WithChildren<T = Record<string, never>> = T & {children: ReactNode};
export type WithChild<T = Record<string, never>> = T & {children: ReactElement};
export type WithOnlyTextChild<T = Record<string, never>> = T & {children: (number | string)[] | number[] | string[] | number | string};
export type WithOptionalOnlyTextChild<T = Record<string, never>> = T & {
    children?: (number | string)[] | number[] | string[] | number | string;
};

type Sizes = `${number}gb` | `${number}kb` | `${number}mb`;
export interface NextApiRouteConfig {
    api: {
        bodyParser: false | {
            sizeLimit: Sizes;
        };
        externalResolver?: boolean;
        maxDuration?: number;
        responseLimit?: Sizes;
    };
}