import { NextResponse } from 'next/server';

// This middleware will run on every request.
export function middleware() {
  // You can log requests or perform actions based on the request.
  console.log('Middleware running for:');

  

  // Continue with the request.
  return NextResponse.next();
}
