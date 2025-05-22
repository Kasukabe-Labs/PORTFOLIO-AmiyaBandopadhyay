import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    console.log('Middleware checking path:', request.nextUrl.pathname);

    // Check if the request is for the dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        const token = request.cookies.get('auth-token')?.value;
        console.log('Auth token found:', !!token);

        if (!token) {
            console.log('No token found, redirecting to login');
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            // Basic token validation - check if it's a JWT format
            const [header, payload, signature] = token.split('.');
            if (!header || !payload || !signature) {
                throw new Error('Invalid token format');
            }

            // Decode the payload
            const decodedPayload = JSON.parse(atob(payload));
            console.log('Token payload:', decodedPayload);

            // Check if token is expired
            const now = Math.floor(Date.now() / 1000);
            if (decodedPayload.exp && decodedPayload.exp < now) {
                throw new Error('Token expired');
            }

            // Token is valid, proceed
            const response = NextResponse.next();
            response.headers.set('x-user-id', decodedPayload.id || '');
            return response;

        } catch (error) {
            console.error('Token validation failed:', error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*',
};
