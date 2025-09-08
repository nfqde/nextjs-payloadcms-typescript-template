import createCache from '@emotion/cache';

/**
 * Creates a new Emotion cache instance for use in a Next.js application.
 *
 * This cache is used to store and manage Emotion-generated styles during rendering,
 * enabling proper style deduplication and performance optimizations.
 * It is particularly useful in scenarios where Emotion is used with server-side rendering (SSR),
 * as it allows styles to be extracted and injected correctly.
 *
 * The cache is configured with a unique key (`'next'`), which is used as a prefix for Emotion's
 * auto-generated class names. This ensures consistent scoping of styles across the application.
 *
 * @returns A configured Emotion cache instance that can be passed to Emotion’s `CacheProvider`.
 *
 * @example
 * ```tsx
 * const emotionCache = createEmotionCache();
 * <CacheProvider value={emotionCache}>
 *   <App />
 * </CacheProvider>
 * ```
 */
export const createEmotionCache = () => createCache({key: 'next'});