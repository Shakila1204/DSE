// create connection to database
import mysql from 'mysql2';

export const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dse_backend',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
