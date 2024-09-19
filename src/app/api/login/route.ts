import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 

const prisma = new PrismaClient()

const JWT = process.env.NEXT_PUBLIC_JWT_SECRET as string;


export async function POST(request: NextRequest) {
  try {
    // Extract email and password from the request body

    const body = await request.json();
    const { username, password } = body;
    console.log(username)

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
    }

    // Find user in the database
    const user = await prisma.user.findFirst({
      where: { username: username },
    })
  
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

      // Check if the password matches using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
      }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        username: user.username,

        },
      JWT,
      { expiresIn: '1h' }
    )

    // Respond with the token
    const response = NextResponse.json({ token: token, message: "Logged in successfully" }, { status: 200 })
    response.cookies.set('token', token, {
    })

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
