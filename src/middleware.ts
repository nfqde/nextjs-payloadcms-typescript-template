import {NextResponse} from 'next/server';

import type {NextRequest} from 'next/server';
import type {AdminUser} from 'types/payload-types';

/**
 * The `middleware` function is responsible for handling request interception and validation in a Next.js application.
 * It checks whether a request is attempting to access a payload preview (`/payload-preview`) and ensures that the request is authorized by validating a `payload-token` cookie.
 * If the token is valid and the request is made within an iframe, the middleware allows the request to proceed. Otherwise, it rewrites the response to a "not found" page.
 *
 * @param request The `NextRequest` object containing details of the incoming request.
 * @returns A `NextResponse` that either proceeds with the request or rewrites it to the "not found" page.
 *
 * @example
 * ```tsx
 * export async function middleware(request: NextRequest) {
 *   // Handle the request logic here
 * }
 * ```
 */
export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const isIFrame = request.headers.get('sec-fetch-dest') === 'iframe';

    if (pathname.startsWith('/payload-preview')) {
        const hasToken = request.cookies.has('payload-token');

        if (!hasToken || !isIFrame) return NextResponse.rewrite(new URL('/not-found', request.url));
        const token = request.cookies.get('payload-token');

        if (!token?.value) return NextResponse.rewrite(new URL('/not-found', request.url));
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin-users/me`, {headers: {Authorization: `JWT ${token.value}`}});

        try {
            const {user} = await response.json() as {user: AdminUser | null};

            if (!user) return NextResponse.rewrite(new URL('/not-found', request.url));
        } catch (e) {
            return NextResponse.rewrite(new URL('/not-found', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/((?!api|_next/static|_next/image|images|videos|admin|favicon.ico|auth|fonts|404).*)'
    ]
};