export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL
})

export async function GET() {
  const client = await pool.connect()

  try {
    const query = 'SELECT * FROM users'
    const result = await client.query(query)

    // console.log("Fetched users:", result.rows)

    return NextResponse.json({ users: result.rows }, {
      status: 200,
    
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  } finally {
    client.release() 
  }
}
