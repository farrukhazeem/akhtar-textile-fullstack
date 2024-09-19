// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
// export async function GET() {
//    try {
//   const users = await prisma.user.findMany()
  
//   return NextResponse.json({users}, { status: 200 })
// } catch (error) {
//   console.error('Error fetching users:', error)
//   return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    
// }
//   }

import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: "postgres://akhtar11:9T0NMeQlomBAVtZ4_Q9RlA@grim-oribi-16146.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/dev_db?sslmode=require"
})

export async function GET() {
  const client = await pool.connect()

  try {
    // Query to select all users from the database
    const query = 'SELECT * FROM users'
    const result = await client.query(query)

    // Log the fetched data for debugging
    console.log("Fetched users:", result.rows)

    // Return the fetched users as a response
    return NextResponse.json({ users: result.rows }, { status: 200 })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  } finally {
    client.release() // Ensure the client is released after query completion
  }
}
