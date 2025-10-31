import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';

dotenv.config();

async function run() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sqlDir = path.resolve(__dirname, '../../sql');
  const schema = fs.readFileSync(path.join(sqlDir, 'schema.sql'), 'utf8');
  const addCategoryPath = path.join(sqlDir, 'add_category.sql');
  const seedPath = path.join(sqlDir, 'init_with_admin.sql');

  const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env as Record<string, string>;
  const conn = await mysql.createConnection({
    host: DATABASE_HOST,
    port: DATABASE_PORT ? Number(DATABASE_PORT) : 3306,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    multipleStatements: true,
  });

  console.log('Applying base schema...');
  await conn.query(schema);

  if (fs.existsSync(addCategoryPath)) {
    console.log('Applying add_category migration...');
    const addCat = fs.readFileSync(addCategoryPath, 'utf8');
    try {
      await conn.query(addCat);
    } catch (e) {
      console.warn('add_category migration may have already been applied. Continuing.');
    }
  }

  if (process.argv.includes('--seed') && fs.existsSync(seedPath)) {
    console.log('Seeding initial data (admin & sample users)...');
    const seed = fs.readFileSync(seedPath, 'utf8');
    await conn.query(seed);
  }

  await conn.end();
  console.log('Migration completed.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
