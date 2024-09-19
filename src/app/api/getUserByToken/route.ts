import { NextResponse,NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;
interface JwtPayload {
    id: number
    email: string
    role: string
  }
  
  export async function GET() {
    try {
      // Access the cookies using `cookies()` 
      const cookieStore = cookies()
      const token = cookieStore.get('token')?.value
        if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }
  
      // Verify the JWT token 
      let decoded: JwtPayload
      try {
        decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
      } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
      }
  
      // Fetch the user from the database based on the decoded token
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
        }
      })
  
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }
  
      return NextResponse.json(user, { status: 200 })
    } catch (error) {
      console.error(error)
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
  }