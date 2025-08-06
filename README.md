
# whereismyksrtc- Server

This is the **server-side** component of the **Bus Tracking System**, responsible for receiving, storing, and serving the real-time location of buses tracked using Android devices.

---

## 🌐 Overview

This backend API:

- Receives GPS coordinates from Android clients.
- Stores or forwards the live location to the database or frontend.
- Provides endpoints to fetch the latest bus locations.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **API Format:** REST
- **Maps:** Integrated with OpenStreetMap (via client-side)

---

## 📁 Project Structure (ignoring: node_modules, .gitignore, .git)   
whereismyksrtcserver<br>
├── env.txt<br>
├── index.js<br>
├── package.json<br>
├── package-lock.json<br>
├── README.md<br>
├── scheduling<br>
├── test.js<br>
├── controllers<br>
│   ├── authController.js<br>
│   ├── busController.js<br>
│   └── locationController.js<br>
├── middleware<br>
│   └── authMiddleware.js<br>
├── routes<br>
│   ├── authRoutes.js<br>
│   ├── busRoutes.js<br>
│   └── locationRoutes.js<br>
├── utils<br>
│   ├── authUtils.js<br>
│   └── db.js<br>
└── .env<br>



