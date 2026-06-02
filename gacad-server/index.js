// === DNS FIX FOR MONGODB ATLAS ===
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8', '8.8.4.4']);
// ==================================

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require('./routes/articleRoutes');

const app = express();

// ====================== MIDDLEWARE ======================
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://gacad-backend.onrender.com',           // your Render backend (for testing)
    'https://your-vercel-frontend.vercel.app'       // ← We will replace this later
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// ====================== DATABASE CONNECTION (MUST WAIT) ======================
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected Successfully!");

    // ====================== ROUTES (only after DB is connected) ======================
    app.use('/api/users', userRoutes);
    app.use('/api/articles', articleRoutes);

    // 404 Handler
    app.use((req, res) => {
      res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

startServer();