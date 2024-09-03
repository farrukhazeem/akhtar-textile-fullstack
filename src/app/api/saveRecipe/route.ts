import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

// Initialize the PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

// Handler for POST requests
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body
    const { recipe, steps } = await request.json();

    // Save recipe
    const result = await client.query(
      `INSERT INTO recipes (Load_Size, Machine_Type, Finish, Fabric, Recipe, FNO, name)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [recipe.loadSize, recipe.machineType, recipe.finish, recipe.fabric, recipe.recipe, recipe.fno, recipe.name]
    );
    const recipeId = result.rows[0].id;

    // Save steps
    for (const step of steps) {
      const stepResult = await client.query(
        `INSERT INTO steps (action, LTRS, RPM, centigrade, PH, TDS, TSS, recipesid)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [step.action, step.liters, step.rpm, step.centigrade, step.ph, step.tds, step.tss, recipeId]
      );
      const stepId = stepResult.rows[0].id;

      // Save chemicals for each step
      for (const chemical of step.chemicals) {
        await client.query(
          `INSERT INTO chemical_association (chemicalid, stepid, percentage, dosage)
           VALUES ($1, $2, $3, $4)`,
          [chemical.id, stepId, chemical.percentage, chemical.dosage]
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving recipe data:', error);
    return NextResponse.json({ success: false, message: 'Failed to save recipe data' }, { status: 500 });
  }
}
