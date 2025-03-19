import db from "../database.js";  
import bcrypt from "bcryptjs";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query("SELECT * FROM users WHERE role='user'");
        res.status(200).json({
            data: users,
            message: "Users retrieved successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error retrieving users",
            error: error.message
        });
    }
};

// Get a user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [users] = await db.query("SELECT * FROM users WHERE id = ? AND role='user'", [id]);

        if (users.length === 0) {
            return res.status(404).json({
                data: null,
                message: "User not found",
                error: null
            });
        }

        res.status(200).json({
            data: users[0],
            message: "User retrieved successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error retrieving user",
            error: error.message
        });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, role = 'USER' } = req.body;
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                data: null,
                message: "Missing required fields",
                error: null
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.query(query, [name, email, hashedPassword, phone, role]);

        res.status(201).json({
            data: { userId: result.insertId },
            message: "User created successfully",
            error: null
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                data: null,
                message: "Email already exists",
                error: null
            });
        }

        res.status(500).json({
            data: null,
            message: "Error creating user",
            error: error.message
        });
    }
};

// Delete a user
export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                data: null,
                message: "User not found",
                error: null
            });
        }

        res.status(200).json({
            data: null,
            message: "User deleted successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error deleting user",
            error: error.message
        });
    }
};

//login user
import jwt from "jsonwebtoken";

// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({
            data: null,
            message: "Email and password are required",
            error: null
        });
    }

    try {
        // Check if user exists
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).json({
                data: null,
                message: "Invalid email or password",
                error: null
            });
        }

        const user = users[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                data: null,
                message: "Invalid email or password",
                error: null
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            data: { userId: user.id, email: user.email, role: user.role, token },
            message: "Login successful",
            error: null
        });

    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Error during login",
            error: error.message
        });
    }
};