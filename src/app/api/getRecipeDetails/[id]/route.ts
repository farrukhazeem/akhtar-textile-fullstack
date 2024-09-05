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
      // `
        // SELECT 
        //     r.id AS recipe_id, r.load_size, r.machine_type, r.finish, r.fabric, r.recipe, r.fno, r.name AS recipe_name,
        //     s.id AS step_id, s.action, s.liters, s.rpm, s.centigrade, s.ph, s.tds, s.tss,
        //     ca.id AS chemical_association_id, ca.dosage, ca.percentage,
        //     ch.id AS chemical_id, ch.name AS chemical_name, ch.amount, ch.unit
        // FROM 
        //     recipes r
      //   -- Join recipes with steps; casting recipeid to integer if necessary
      //   JOIN 
      //       steps s ON r.id = CAST(s.recipesid AS INT)
      //   -- Join steps with chemical_association; casting stepid to integer if necessary
      //   JOIN 
      //       chemical_association ca ON s.id = CAST(ca.stepid AS INT)
      //   -- Join chemical_association with chemicals; casting chemicalid if necessary
      //   JOIN 
      //       chemicals ch ON ca.chemicalid = CAST(ch.id AS VARCHAR)
      //   WHERE 
      //       r.id = $1;
      // `,
      'SELECT r.id AS recipe_id, r.load_size, r.machine_type, r.finish, r.fabric, r.recipe, r.fno, r.name AS recipe_name FROM recipes r where r.id = $1',
      [id]
    );
    console.log(result.rows[0].recipe_id)
    const steps = await client.query(
      'SELECT * FROM steps where recipesid = $1',[result.rows[0].recipe_id]
    );
    console.log("Loop starting",steps.rows.length)
    const chem_ass = await client.query(`SELECT c.*
FROM chemicals c
JOIN chemical_association ca ON c.id = CAST(ca.chemicalid AS INT)
JOIN steps s ON ca.stepid = s.id::VARCHAR(255)
WHERE s.recipesid = $1;
`,[result.rows[0].recipe_id])
    // for(let step of steps.rows){
    //   console.log(step.id)
    //   const chem_ass = await client.query(
    //     'SELECT * FROM chemicals where id ',[step.id]
    //   )
    // }
      console.log(chem_ass.rows)
    
    client.release();

    // console.log('Recipe result:', result.rows);
    // console.log('Steps result:', steps.rows);

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
