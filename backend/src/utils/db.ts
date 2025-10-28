import mysql from 'mysql2/promise';

const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env as Record<string, string>;

export const pool = mysql.createPool({
  host: DATABASE_HOST,
  port: DATABASE_PORT ? Number(DATABASE_PORT) : 3306,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true,
});

export async function query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const [rows] = await pool.query(sql, params);
  return rows as T[];
}
