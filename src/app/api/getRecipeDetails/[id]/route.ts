import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: "postgres://akhtar11:9T0NMeQlomBAVtZ4_Q9RlA@grim-oribi-16146.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/dev_db?sslmode=require" });

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

    // Fetch recipe details
    const recipeResult = await client.query(
      `SELECT r.id AS recipe_id, r.load_size, r.machine_type, r.finish, r.fabric, r.recipe, r.fno, r.name AS recipe_name 
      FROM recipes r 
      WHERE r.id = $1
      `,
      [id]
    );

    // Fetch steps for the recipe
    const stepsResult = await client.query(
      'SELECT * FROM steps WHERE recipesid = $1',[recipeResult.rows[0].recipe_id]
    );

    // Fetch chemical associations and chemicals
    const chemicalsResult = await client.query(`
      SELECT ca.dosage, ca.percentage, c.id AS chemical_id, c.name AS chemical_name, s.id AS step_id
      FROM chemicals c
      JOIN chemical_association ca ON c.id = CAST(ca.chemicalid AS INT)
      JOIN steps s ON ca.stepid = s.id::VARCHAR(255)
      WHERE s.recipesid = $1
    `, [recipeResult.rows[0].recipe_id]);

    // console.log('Chemicals Result:', chemicalsResult.rows);

    client.release();

    if (recipeResult.rows.length > 0) {
      const recipe = recipeResult.rows[0];
      const steps = stepsResult.rows;
      const chemicals = chemicalsResult.rows;
      console.log("chemicals prints, ===>>> ", chemicals[0])
      console.log("steps<<<<<<======", steps[0])
      const formattedRecipe = {
        ...recipe,
        steps: steps.map(step => ({
          ...step,
          chemicals: chemicals.filter(chemical => chemical.step_id === step.id)
        }))
      };

      return NextResponse.json(formattedRecipe);
    } else {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
