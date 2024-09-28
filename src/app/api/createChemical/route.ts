import { NextResponse } from 'next/server'
import { Pool } from 'pg'
const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL
})

export async function POST(request: Request) {
  const client = await pool.connect()
  
  try {
    // Parse the request body
    const {
      name,
      full_name,    
      costPerKg,   
      kgPerCan,     
      costPerUnit,  
      costUom,      
      typeAndUse,   
      unitUsed,     
      unitConversion 
    } = await request.json()

     const existingChemicalResult = await client.query(
      'SELECT * FROM chemicals WHERE name = $1',[name]
    );
   
    if (existingChemicalResult.rows.length > 0) {
      return NextResponse.json({ message: 'Chemical already exists' }, { status: 400 })
    }

    // Create the new chemical
    const insertQuery = `
    INSERT INTO chemicals (
      name, full_name, cost_per_kg, kg_per_can, cost_per_unit, cost_uom, type_and_use, unit_used, unit_conversion
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)
    RETURNING id, name, full_name, cost_per_kg, kg_per_can, cost_per_unit, cost_uom, type_and_use, unit_used, unit_conversion
  `
  
    const values = [
      name,    
      full_name,
      costPerKg,   
      kgPerCan,     
      costPerUnit,  
      costUom,      
      typeAndUse,   
      unitUsed,     
      unitConversion 
    ]

    const newChemnicalResult = await client.query(insertQuery, values)
    const newChemical = newChemnicalResult.rows[0]

    return NextResponse.json({
      id: newChemical.id,
      name: newChemical.name,  
      full_name: newChemical.full_name,   
      costPerKg: newChemical.costPerKg,    
      kgPerCan: newChemical.kgPerCan,      
      costPerUnit: newChemical.costPerUnit, 
      costUom: newChemical.costUom,        
      typeAndUse: newChemical.typeAndUse,  
      unitUsed: newChemical.unitUsed,      
      unitConversion: newChemical.unitConversion 
    }, { status: 201 });
    

  } catch (error) {
    console.error('Error creating chemical:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  } finally {
    client.release() 
  }
}
