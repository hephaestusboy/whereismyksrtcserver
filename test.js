const axios = require('axios');

const API_URL = 'https://whereismyksrtc.onrender.com'; // ✅ Update to hosted server

// ✅ 1. Test User Registration (Driver)
async function registerUser() {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, {
      email: "drivefwedr1232@example.com",
      password: "myp12asswgword123",
      fullName: "John fDoeefeasedr",
      role: 1
    });
    console.log("✅ Register User:", res.data);
    return res.data.token; // Return driver ID for next tests
  } catch (error) {
    console.error("❌ Register User Error:", error.response?.data || error.message);
  }
}

// ✅ 2. Test Adding a New Bus
async function addBus(driverId) {
  try {
    const res = await axios.post(`${API_URL}/bus/add`, {
      busId: "BUS10013",
      route: "Downtown to Uptown",
      driverId: "2"
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("✅ Add Bus:", res.data);
  } catch (error) {
    console.error("❌ Add Bus Error:", error.response?.data || error.message);
  }
}

// ✅ 3. Test Updating Bus Location
async function updateBusLocation(token) {
  try {
    const res = await axios.post(`${API_URL}/location/update`, {
      busId: "BUS1001",
      latitude: 37.7749,
      longitude: -122.4194,
      speed: 45
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("✅ Update Bus Location:", res.data);
  } catch (error) {
    console.error("❌ Update Bus Location Error:", error.response?.data || error.message);
  }
}

// ✅ 4. Test Fetching Latest Bus Location
async function getLatestBusLocation(token) {
  try {
    const res = await axios.get(`${API_URL}/location/latest/BUS1001`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("✅ Get Latest Bus Location:", res.data);
  } catch (error) {
    console.error("❌ Get Latest Bus Location Error:", error.response?.data || error.message);
  }
}


// ✅ 6. Test Generating QR Code
async function displayQRCode(busId, res) {
    try {
        const response = await axios.get(`${API_URL}/bus/qrcode/generate/${busId}`);

        if (response.data.qrCodeURL) {
            res.send(`
                <h1>QR Code for ${busId}</h1>
                <img src="${response.data.qrCodeURL}" alt="QR Code">
            `);
        } else {
            res.send('<h1>Error: QR Code not generated</h1>');
        }
    } catch (error) {
        res.send('<h1>Error fetching QR Code</h1>');
    }
}
// ✅ Run All Tests in Order
async function runTests() {
  console.log("🚀 Starting Tests on Render Server...");

  const driverId = await registerUser();
  if (driverId) {
    await addBus(driverId);
  }

  // Simulating login (Replace with actual login API if needed)
  const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwOTQwODg5LCJleHAiOjE3NDEwMjcyODl9.Ld28Nb29-FH03UxefY-5RiXBXbP9qZgyDj7qlECeABc"; // Replace this with a real token from login

  await updateBusLocation(fakeToken);
  await getLatestBusLocation(fakeToken);
  await displayQRCode(busId,res);

  console.log("✅ All tests completed.");
}

runTests();
