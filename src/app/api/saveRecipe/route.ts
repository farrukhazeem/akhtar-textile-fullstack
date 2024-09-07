import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({ connectionString: "postgres://akhtar11:9T0NMeQlomBAVtZ4_Q9RlA@grim-oribi-16146.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/dev_db?sslmode=require" });

export async function POST(request: Request) {
    const client = await pool.connect();
    try {
        const res = await request.json();
        
        console.log("res====>>>>", res)
        let recipe1 = {
            fileName: res.fileName,
            loadSize: res.loadSize,
            machineType: res.machineType,
            finish: res.finish,
            fabric: res.fabric,
            fno: res.fno,
            recipe: res.recipe
        };


        let steps = res.steps;
        
        await client.query('BEGIN');

        const result = await client.query(
            `INSERT INTO recipes (load_size, machine_type, finish, fabric, recipe, fno, name)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
            [recipe1.loadSize, recipe1.machineType, recipe1.finish, recipe1.fabric, recipe1.recipe, recipe1.fno, recipe1.fileName]
        );
        const recipeId = result.rows[0].id;
        
        for (const step of steps) {
            console.log("", step)
            const stepResult = await client.query(
                `INSERT INTO steps (action, liters, rpm, centigrade, ph, tds, tss, recipesid, step_no, minutes)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
                [step.action, step.litres, step.rpm, step.temperature, step.ph, step.tds, step.tss, recipeId, step.step_no, step.minutes]
            );
            const stepId = stepResult.rows[0].id;

            for (const chemical of step.chemicals) {
                
                const chemicalResult = await client.query(
                    `INSERT INTO chemicals (name)
                     VALUES ($1) RETURNING id`, 
                    [chemical.recipe_name]
                );
                const chemicalId = chemicalResult.rows[0].id;
                await client.query(
                    `INSERT INTO chemical_association (stepid, chemicalid, percentage, dosage)
                     VALUES ($1, $2, $3, $4)`,
                    [stepId, chemicalId, chemical.percentage, chemical.dosage]
                ); 
            }
        }

        await client.query('COMMIT');
        return NextResponse.json({ success: true });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error saving recipe data:', error);
        return NextResponse.json({ success: false, message: 'Failed to save recipe data' });
    } finally {
        client.release();
    }
}
