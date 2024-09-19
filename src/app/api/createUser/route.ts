import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    console.log(request)
    // Parse the request body
    const { username, password,
      name, access,account,bank ,cnic, 
      code,
      department,
      designation,
      manager,
      phone} = await request.json()

    

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the new user
    const user = await prisma.user.create({
      data: {
        username,
        password:hashedPassword,
        name,
        access,account,bank ,cnic, 
      code,
      department,
      designation,
      manager,
      phone
        
      },
    })

    return NextResponse.json({
      id: user.id,
      name: user.name,
      username: user.username,  
      access: user.access,
      account: user.account,
      bank: user.bank,
      cnic: user.cnic,
      code: user.code,
      department: user.department,
      designation: user.designation,
      manager: user.manager,
      phone: user.phone
     
    }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}