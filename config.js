import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();


console.log("🔍 DATABASE CONFIG:");
console.log("DB_HOST:", process.env.DB_HOST);