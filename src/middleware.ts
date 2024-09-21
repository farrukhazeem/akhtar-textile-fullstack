// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Check if the request is for an API route
  if (url.pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store'); // Disable cache for API routes
    return response;
  }

  return NextResponse.next();
}

// Ensure that only API routes use the middleware
export const config = {
  matcher: '/api/:path*',
};
