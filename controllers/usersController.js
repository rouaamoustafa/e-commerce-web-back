const db = require("../config/db");

// Get all users
exports.getAllUsers = (req, res) => {
    db.query("SELECT * FROM users where role='user'", (err, results) => {
        if (err) return res.status(500).json({ success: false, error: err });
        res.json({ success: true, users: results });
    });
};

// Get a user by ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM users WHERE id = ? and role='user'", [id], (err, results) => {
        if (err) return res.status(500).json({ success: false, error: err });
        if (results.length === 0) return res.status(404).json({ success: false, message: "User not found" });
        res.json({ success: true, user: results[0] });
    });
};

const bcrypt = require("bcryptjs");

// Create a new user
exports.createUser = (req, res) => {
    const { name, email, password, phone, role = 'USER' } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ success: false, error: err });
        }

        // Insert user into the database
        const query = `
            INSERT INTO users (name, email, password, phone, role)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [name, email, hashedPassword, phone, role];

        db.query(query, values, (err, result) => {
            if (err) {
                // Handle duplicate email error (unique constraint violation)
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ success: false, message: 'Email already exists' });
                }
                return res.status(500).json({ success: false, error: err });
            }
            res.json({ success: true, message: "User created", userId: result.insertId });
        });
    });
};


// Delete a user
exports.deleteUserById = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ success: false, error: err });
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "User not found" });
        res.json({ success: true, message: "User deleted" });
    });
};

