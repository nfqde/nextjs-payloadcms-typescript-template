/// <reference types="node" />
// eslint-disable-next-line no-underscore-dangle, no-var
declare var __coverage__: boolean | string | null | undefined;
declare namespace NodeJS {
    interface ProcessEnv {
        FEATURE_ENV: string;
        MONGODB_URI: string;
        NEXT_PUBLIC_BASE_URL: string;
        PAYLOAD_DEV_PASS: string;
        PAYLOAD_DEV_USER: string;
        PAYLOAD_SECRET: string;
    }
}