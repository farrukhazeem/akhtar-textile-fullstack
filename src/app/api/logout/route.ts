import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Clear the 'token' cookie
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.set('token', '', {
      expires: new Date(0), // Set the cookie to expire in the past
      path: '/', // Ensure the path matches the cookie's path
    });
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
  }
}