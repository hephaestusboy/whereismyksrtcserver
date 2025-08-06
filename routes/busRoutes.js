const express = require('express');
const { addBus, getBusLocation, getBusList, sendBusLocation } = require('../controllers/busController'); // Import controller functions
const QRCode = require('qrcode');
const authenticateToken = require('../middleware/authMiddleware');


const router = express.Router();

// ✅ Add a bus (Already present)
router.post('/add', authenticateToken, addBus);

// ✅ Get latest location of a specific bus
router.get('/location/:busId', authenticateToken, getBusLocation);

// Get list of buses present in a route
router.get('/search', authenticateToken, getBusList)

// Update location of bus
router.get('/locationsend/:busId', authenticateToken, sendBusLocation);

// ✅ Generate QR code for a bus
router.get('/qrcode/generate/:busId', async (req, res) => {
    try {
        const { busId } = req.params;
        const qrCodeURL = await QRCode.toDataURL(busId);
        res.json({ busId, qrCodeURL });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

module.exports = router;
