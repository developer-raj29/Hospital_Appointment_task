# 🏥 Hospital Appointment Management System

This is a full-stack MERN-based Hospital Appointment Management System. It allows patients to book appointments with doctors, and doctors to manage appointments via a dashboard interface.

## 📁 Project Structure
```bash
hospital-appointment-system/
├── public/                 # Static assets for frontend
├── server/                # Backend (Node.js + Express + MongoDB)
├── src/                   # React frontend source code
│   ├── assets/            # Images and static resources
│   ├── components/        # Reusable UI components (Note: typo fixed)
│   ├── pages/             # Route-based page components
│   ├── App.jsx            # Main App component
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point for React (Vite)
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js         # Vite configuration
```

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud)
- npm or yarn

---

### 📑 Installation

1. **Clone the repository:**
```bash 
git clone https://github.com/your-username/hospital-appointment-system.git
cd hospital-appointment-system`☺
```

# In the root directory
```bash 
npm install        # Installs root-level and shared dependencies
cd server && npm install  # Installs server dependencies

```

### 🌐 Environment Variables
```bash 
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run both frontend and backend with one command:
```bash
npm run dev
```

### 🧪 Tech Stack
 - Frontend: React.js, Vite, MUI (Material UI)
 - Backend: Node.js, Express.js, MongoDB
 - Auth: JWT-based Authentication
 - Others: Axios, Toastify, Dicebear Avatars

📄 License
This project is licensed under the MIT License.
---
Let me know if you want me to auto-generate `.env` templates, folder structures, or badges for GitHub!

Made with ❤️ by Raj Yadav
