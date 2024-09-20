import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

// PostgreSQL connection
const pool = new Pool({
  connectionString: "postgres://akhtar11:9T0NMeQlomBAVtZ4_Q9RlA@grim-oribi-16146.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/dev_db?sslmode=require"
});

const JWT_SECRET = process.env.JWT_SECRET || "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm";

// Function to decode token and get user
export async function getUserFromToken(token: string | null) {
  try {

    if (!token) {
        // If the token is null, handle it appropriately
        return { user: null, error: 'Token is missing' };
      }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const userId = decoded.id;

    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
    client.release();

    if (result.rows.length === 0) {
      return { error: "User not found" };
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error decoding token:", error);
    return { error: "Invalid token" };
  }
}

