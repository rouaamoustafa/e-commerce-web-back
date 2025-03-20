import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log("\uD83D\uDD0D DATABASE CONFIG:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

const db = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    port: process.env.DB_PORT || 3306, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const testDbConnection = async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ Database connected successfully!");
        connection.release();
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
    }
};

testDbConnection();
export default db;
