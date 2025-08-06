const express = require('express');
const { updateBusLocation,getLatestBusLocation } = require('../controllers/locationController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();


// Provide bus Location 
router.get('/latest/:busId', authenticateToken, getLatestBusLocation);

// Update Bus Location (Protected Route)
router.post('/update', authenticateToken, updateBusLocation);


module.exports = router;
