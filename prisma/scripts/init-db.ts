// libs/database/scripts/init-db.ts
import { Client } from 'pg';
import 'dotenv/config';

async function initDb() {
    const dbUrl = process.env['DATABASE_URL'];
    if (!dbUrl) {
        console.error('❌ DATABASE_URL not found in .env');
        process.exit(1);
    }

    // Ambil nama DB target dari DATABASE_URL (misal: my_db)
    const urlObj = new URL(dbUrl);
    const targetDbName = urlObj.pathname.replace('/', '') || 'forumqna_db';

    // Koneksi sementara ke database default 'postgres'
    urlObj.pathname = '/postgres';

    const client = new Client({ connectionString: urlObj.toString() });

    try {
        await client.connect();

        // Cek apakah database sudah ada
        const res = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [targetDbName]
        );

        if (res.rowCount === 0) {
            console.log(`🔨 Database "${targetDbName}" does not exist. Creating database...`);
            await client.query(`CREATE DATABASE "${targetDbName}"`);
            console.log(`✅ Database "${targetDbName}" created!`);
        } else {
            console.log(`ℹ️ Database "${targetDbName}" already exists.`);
        }
    } catch (error) {
        console.error('❌ Failed creating database:', error);
    } finally {
        await client.end();
    }
}

initDb();