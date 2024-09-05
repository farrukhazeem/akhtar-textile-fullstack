// src/app/api/getRecipeDetails/[id]/route.ts

import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(req: Request, { params }: { params: { id: string } }) {
  console.log('Received request for ID:', params.id);

  const { id } = params;

  try {
    const numericId = parseInt(id, 10);
    console.log('Parsed ID:', numericId);

    if (isNaN(numericId)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM recipes WHERE id = $1`,
      [id]
    );
    
    client.release();

    console.log('Query result:', result.rows);

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0]);
    } else {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
