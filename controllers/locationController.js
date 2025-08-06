const pool = require('../utils/db');

const updateBusLocation = async (req, res) => {
  try {
    const { busId, latitude, longitude, speed } = req.body;
    const userId = req.user.id;

    if (!busId || !latitude || !longitude) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    //  Check if the bus exists
    const busCheck = await pool.query('SELECT bus_id FROM buses WHERE bus_id = $1', [busId]);
    if (busCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid bus ID: Bus does not exist' });
    }

    //  Insert or update bus location
    await pool.query(
      `INSERT INTO bus_tracking (bus_id, latitude, longitude, speed, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (bus_id) 
       DO UPDATE SET latitude = EXCLUDED.latitude, 
                     longitude = EXCLUDED.longitude, 
                     speed = EXCLUDED.speed, 
                     updated_at = NOW();`,
      [busId, latitude, longitude, speed || 0]
    );

    res.json({ message: 'Bus location updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



//  Function to Get the Latest Bus Location
const getLatestBusLocation = async (req, res) => {
  try {
    const { busId } = req.params;

    const { rows } = await pool.query(
      `SELECT latitude, longitude, speed, updated_at 
       FROM bus_tracking 
       WHERE bus_id = $1 
       LIMIT 1;`,
      [busId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No location data found for this bus' });
    }

    res.json(rows[0]); //  Return the latest location
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

  
module.exports = { updateBusLocation, getLatestBusLocation };