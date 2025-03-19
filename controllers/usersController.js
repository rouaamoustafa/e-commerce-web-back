import db from "../database.js";  // Ensure database.js is using ES module syntax
import bcrypt from "bcryptjs";

// Get all users
export const getAllUsers = (req, res) => {
    db.query("SELECT * FROM users WHERE role='user'", (err, results) => {
        if (err) {
            return res.status(500).json({
                data: null,
                message: "Error retrieving users",
                error: err.message
            });
        }
        res.status(200).json({
            data: results,
            message: "Users retrieved successfully",
            error: null
        });
    });
};

// Get a user by ID
export const getUserById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM users WHERE id = ? AND role='user'", [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                data: null,
                message: "Error retrieving user",
                error: err.message
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                data: null,
                message: "User not found",
                error: "No user with the provided ID"
            });
        }
        res.status(200).json({
            data: results[0],
            message: "User retrieved successfully",
            error: null
        });
    });
};

// Create a new user
export const createUser = (req, res) => {
    const { name, email, password, phone, role = 'USER' } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            data: null,
            message: "Missing required fields",
            error: "Required fields: name, email, password, phone"
        });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({
                data: null,
                message: "Error hashing password",
                error: err.message
            });
        }

        const query = `INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)`;
        const values = [name, email, hashedPassword, phone, role];

        db.query(query, values, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({
                        data: null,
                        message: "Email already exists",
                        error: "Duplicate email entry"
                    });
                }
                return res.status(500).json({
                    data: null,
                    message: "Error creating user",
                    error: err.message
                });
            }
            res.status(201).json({
                data: { userId: result.insertId },
                message: "User created successfully",
                error: null
            });
        });
    });
};

// Delete a user
export const deleteUserById = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                data: null,
                message: "Error deleting user",
                error: err.message
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                data: null,
                message: "User not found",
                error: "No user with the provided ID"
            });
        }
        res.status(200).json({
            data: { userId: id },
            message: "User deleted successfully",
            error: null
        });
    });
};
