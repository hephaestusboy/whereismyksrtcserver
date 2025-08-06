const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');
const busRoutes = require('./routes/busRoutes'); // Import bus routes

dotenv.config();
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Root Route - Displays a message when accessed
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Bus Tracking System API</h1><p>Use /auth/register to sign up or /auth/login to log in.</p>');
});

// Use authentication and location tracking routes
app.use('/auth', authRoutes);
app.use('/location', locationRoutes); // Added location tracking routes
app.use('/bus', busRoutes); //Route to add bus

const PORT = process.env.PORT || 12000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


