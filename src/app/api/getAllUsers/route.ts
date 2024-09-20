import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: "postgres://akhtar11:9T0NMeQlomBAVtZ4_Q9RlA@grim-oribi-16146.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/dev_db?sslmode=require"
})

export async function GET() {
  const client = await pool.connect()

  try {
    const query = 'SELECT * FROM users'
    const result = await client.query(query)

    // console.log("Fetched users:", result.rows)

    return NextResponse.json({ users: result.rows }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate', // Disable caching for this API route
      },
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  } finally {
    client.release() 
  }
}
