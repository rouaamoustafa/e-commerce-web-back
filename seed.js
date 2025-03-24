import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from "./database.js"; 

dotenv.config();

const seedAdmin = async () => {
    try {
        // Admin credentials
        const adminName = 'Super Admin';
        const adminEmail = 'admin@example.com'; // use a valid email if needed
        const plainPassword = 'Admin@123';       // use a strong password
        const adminPhone = '0123456789';
        const adminRole = 'ADMIN';

        // Hash the password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Check if an admin with this email already exists
        const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [adminEmail]);
        if (existing.length > 0) {
            console.log('Admin already exists:', existing[0]);
            // Generate a JWT token for the existing admin
            const token = jwt.sign(
                { id: existing[0].id, email: existing[0].email, role: existing[0].role },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );
            console.log('Existing Admin JWT Token:', token);
            return;
        }

        // Insert the admin user into the database
        const [result] = await db.query(
            "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
            [adminName, adminEmail, hashedPassword, adminPhone, adminRole]
        );

        console.log('Admin user created successfully!');
        console.log('Admin ID:', result.insertId);
        console.log('Plain Password (save this!):', plainPassword);

        // Generate a JWT token for testing
        const token = jwt.sign(
            { id: result.insertId, email: adminEmail, role: adminRole },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log('JWT Token (use this to test protected routes):');
        console.log(token);

    } catch (error) {
        console.error('Error seeding admin user:', error.message);
    } finally {
        process.exit(); // Exit the process once done
    }
};

seedAdmin();
