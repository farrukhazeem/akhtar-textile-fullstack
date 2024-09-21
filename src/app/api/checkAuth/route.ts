import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    jwt.verify(token, secretKey);
    return NextResponse.json({ authenticated: true });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}