import { NextResponse } from 'next/server'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({
  connectionString: "postgres://akhtar11:9T0NMeQlomBAVtZ4_Q9RlA@grim-oribi-16146.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/dev_db?sslmode=require"
})

export async function POST(request: Request) {
  const client = await pool.connect()
  
  try {
    // Parse the request body
    const {
      username, password, name, access, account, bank, cnic, 
      code, department, designation, manager, phone
    } = await request.json()

     const existingUserResult = await client.query(
      'SELECT * FROM users WHERE username = $1',[username]
    );
   
    if (existingUserResult.rows.length > 0) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the new user
    const insertUserQuery = `
      INSERT INTO users (
        username, password, name, access, account, bank, cnic, code,
        department, designation, manager, phone
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id, name, username, access, account, bank, cnic, code, department, designation, manager, phone
    `

    const values = [
      username, hashedPassword, name, access, account, bank, cnic,
      code, department, designation, manager, phone
    ]

    const newUserResult = await client.query(insertUserQuery, values)
    const newUser = newUserResult.rows[0]

    return NextResponse.json({
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      access: newUser.access,
      account: newUser.account,
      bank: newUser.bank,
      cnic: newUser.cnic,
      code: newUser.code,
      department: newUser.department,
      designation: newUser.designation,
      manager: newUser.manager,
      phone: newUser.phone
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  } finally {
    client.release() 
  }
}
