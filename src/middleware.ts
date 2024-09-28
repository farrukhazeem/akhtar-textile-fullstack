import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET || "";

export function middleware(req: NextRequest) {
  // Log the request URL
  console.log('Middleware running for:', req.url);

  // Get the JWT token from the cookies
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // If no token, redirect to the login page
    console.log('No token found, redirecting to /login');
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    console.log('Token verified:', decoded);

    // If the token is valid, proceed with the request
    return NextResponse.next();
  } catch (error:any) {
    // If token verification fails, redirect to the login page
    console.error('Invalid token, redirecting to /login:', error.message);
    return NextResponse.redirect(new URL('/', req.url));
  }
}


export const config = {
  matcher: ['/protected/:path*', '/some-other-protected-route'], // Protected routes
  // Exclude /login route
  skip: ['/', '/api/login'],
};