import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Initialize the PostgreSQL connection pool
const pool = new Pool({
  connectionString: "postgres://akhtar11:9T0NMeQlomBAVtZ4_Q9RlA@grim-oribi-16146.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/dev_db?sslmode=require"
});

// Define the handler for the API route
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const client = await pool.connect();
  const userId = params.id;

  try {
    const query = 'SELECT accesslevels FROM access_levels WHERE usersid = $1';
    const result = await client.query(query, [userId]);
    console.log(result.rows);    
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'UserId not found' }, { status: 404 });
    }

    // Return the user data
    const user = result.rows;
    return NextResponse.json(user);

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    client.release();
  }
}