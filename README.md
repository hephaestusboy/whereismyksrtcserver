
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
whereismyksrtcserver
├── env.txt
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── scheduling
├── test.js
├── controllers
│   ├── authController.js
│   ├── busController.js
│   └── locationController.js
├── middleware
│   └── authMiddleware.js
├── routes
│   ├── authRoutes.js
│   ├── busRoutes.js
│   └── locationRoutes.js
├── utils
│   ├── authUtils.js
│   └── db.js
└── .env



