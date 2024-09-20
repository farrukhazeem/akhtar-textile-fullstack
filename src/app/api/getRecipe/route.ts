// src/app/api/getRecipe/route.ts
export const fetchCache = 'force-no-store';

import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: "postgres://akhtar11:9T0NMeQlomBAVtZ4_Q9RlA@grim-oribi-16146.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/dev_db?sslmode=require" });


export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM "recipes"');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
