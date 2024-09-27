import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// Set up the connection pool for PostgreSQL
const pool = new Pool({
  connectionString: "postgres://akhtar11:9T0NMeQlomBAVtZ4_Q9RlA@grim-oribi-16146.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/dev_db?sslmode=require"
});

export async function POST(request: Request) {
  const client = await pool.connect();
  
  try {
    // Parse the request body
    const {
      username, password, name, accesslevels, account, bank, cnic, 
      code, department, designation, manager, phone
    } = await request.json();

    // Check if the user already exists
    const existingUserResult = await client.query(
      'SELECT * FROM users WHERE username = $1', [username]
    );

    if (existingUserResult.rows.length > 0) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const insertUserQuery = `
      INSERT INTO users (
        username, password, name, account, bank, cnic, code,
        department, designation, manager, phone
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, name, username, account, bank, cnic, code, department, designation, manager, phone
    `;

    const values = [
      username, hashedPassword, name, account, bank, cnic,
      code, department, designation, manager, phone
    ];

    const newUserResult = await client.query(insertUserQuery, values);
    const newUser = newUserResult.rows[0];
    const userId = newUser.id;
   
    const insertAccessLevelQuery = `
      INSERT INTO access_levels (usersid, accesslevels) 
      VALUES ($1, $2)
      RETURNING id, usersid, accesslevels
    `;

    const accessLevelInsertPromises = accesslevels.map((level:any) => {
      return client.query(insertAccessLevelQuery, [userId, level]);
    });

    // Wait for all insertions to complete
    const newAccessLevelsResults = await Promise.all(accessLevelInsertPromises);
    const newAccessLevels = newAccessLevelsResults.map(result => result.rows[0]);

    return NextResponse.json({
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      account: newUser.account,
      bank: newUser.bank,
      cnic: newUser.cnic,
      code: newUser.code,
      department: newUser.department,
      designation: newUser.designation,
      manager: newUser.manager,
      phone: newUser.phone,
      accessLevels: newAccessLevels // Return the new access levels created
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    client.release(); // Release the client back to the pool
  }
}
