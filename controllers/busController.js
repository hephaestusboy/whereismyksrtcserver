const pool = require('../utils/db');

const addBus = async (req, res) => {
  try {
    const { busId, route, driverId } = req.body;
    const userrole = req.user.role;

    if (!busId || !route || !driverId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingBus = await pool.query('SELECT bus_id FROM buses WHERE bus_id = $1', [busId]);
    if (existingBus.rows.length > 0) {
      return res.status(400).json({ message: 'Bus ID already exists' });
    }

    const UserCheck = await pool.query('SELECT id FROM users WHERE id = $1', [driverId]);
    if (driverCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid driver ID: Driver not found' });
    }
    if (driverCheck.role !== 2){
      return res.status(400).json({message: 'Invalid role. You are not allowed to use current operation'})
    }

    await pool.query(
      `INSERT INTO buses (bus_id, route, driver_id) VALUES ($1, $2, $3)`,
      [busId, route, driverId]
    );

    res.json({ message: 'Bus added successfully with custom Bus ID', busId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller for getting bus location (Mock data)
const getBusLocation = (req, res) => {
    const { busId } = req.params;
    const location = { lat: 12.34, lon: 56.78, busId };

    if (!location) {
        return res.status(404).json({ message: 'No location data found for this bus' });
    }

    res.json(location);
};

const getBusList = async (req, res) => {
  try {
    const { departurePoint, arrivalPoint } = req.query;

    if (!departurePoint || !arrivalPoint) {
      return res.status(400).json({ message: 'Missing parameters' });
    }

    const buses = await pool.query(
      `SELECT DISTINCT s.bus_id 
       FROM bus_routes s 
       JOIN bus_routes e ON s.bus_id = e.bus_id 
       WHERE s.station = $1 
       AND e.station = $2 
       AND s.stop_order < e.stop_order`, 
      [departurePoint, arrivalPoint]
    );

    if (buses.rows.length === 0) {
      return res.status(404).json({ message: 'No bus found' });
    }

    return res.status(200).json(buses.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const sendBusLocation = async (req, res) => {
  try {
    const { busId, latitude, longitude, speed } = req.body;

    if (!busId || !latitude || !longitude || !speed) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Store location data in the database
    await pool.query(
      `INSERT INTO bus_locations (bus_id, latitude, longitude, speed, timestamp) VALUES ($1, $2, $3, $4, NOW())`,
      [busId, latitude, longitude, speed]
    );

    res.status(200).json({ message: 'Bus location updated successfully' });
  } catch (error) {
    console.error('Error updating bus location:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = { addBus, getBusLocation,sendBusLocation, getBusList };
