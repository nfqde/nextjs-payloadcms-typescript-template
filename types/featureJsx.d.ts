/* eslint-disable max-classes-per-file, react/no-multi-comp */
declare module '@nfq/feature-flags/jsx' {
    import type {ReactNode} from 'react';
    import {Component} from 'react';

    interface IFeature {
        children: ReactNode;
        deprecatesOn?: string;
        feature: boolean[] | boolean;
        neverDeprecates?: boolean;
    }

    /**
     * WithFeature component.
     */
    export class WithFeature extends Component<IFeature, any> {}
    /**
     * WithoutFeature component.
     */
    export class WithoutFeature extends Component<IFeature, any> {}
}