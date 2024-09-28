import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
export const dynamic = 'force-dynamic';

// Secret key for JWT (use environment variable for better security)
const JWT_SECRET = process.env.JWT_SECRET || "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm";

// Function to get the user details (id) from the JWT token
export function GET(request: NextRequest) {
  try {
    // Get the 'token' cookie from the request headers
    const token = request.cookies.get('token')?.value;

    // If no token is found, return an error response
    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 401 });
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Extract user id from the token payload
    const { id } = decodedToken as { id: string };

    // Return user details in the response
    return NextResponse.json({ id });

  } catch (error) {
    console.error("Invalid or missing token:", error);
    // Return an error response if the token is invalid or an error occurs
    return NextResponse.json({ error: 'Invalid or missing token' }, { status: 401 });
  }
}