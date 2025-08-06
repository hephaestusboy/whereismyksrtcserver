const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Hash password before saving it in the database
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare entered password with stored hashed password
const comparePassword = async (enteredPassword, storedHash) => {
  return bcrypt.compare(enteredPassword, storedHash);
};

// Generate JWT token for authentication
const generateToken = (userId,userrole) => {
  return jwt.sign({ id: userId ,role: userrole}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};

module.exports = { hashPassword, comparePassword, generateToken };
