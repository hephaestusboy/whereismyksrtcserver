const pool = require('../utils/db');
const { hashPassword, comparePassword, generateToken } = require('../utils/authUtils');
const { user } = require('pg/lib/defaults');

// Register User
const registerUser = async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;

    // Check if email is already registered
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    // Insert user into the database
    const newUser = await pool.query(
      'INSERT INTO users (email, password_hash, full_name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, role',
      [email, hashedPassword, fullName, role]
    );
    if (newUser.rowCount > 0) {
      console.log(' New User Created:', newUser.rows[0]);

    // Generate a token for the new user
    const token = generateToken(newUser.rows[0].id);
    return res.status(201).json({ message: 'User registered successfully', token });

    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await pool.query('SELECT id, password_hash, role FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await comparePassword(password, user.rows[0].password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user.rows[0].id,user.rows[0].role);
    res.json({ message: 'Login successful', token });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
