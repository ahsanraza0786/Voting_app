const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
require("dotenv").config();

// Configure CORS to allow common local dev ports and credentials
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:300',
 'https://voting-app-rust.vercel.app', // frontend URL
    
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (process.env.NODE_ENV !== 'production') return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body use the middleware 
const PORT = process.env.PORT || 8080;

const { jwtAuthMiddleware } = require("./jwt");

// Import the router files
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const electionRoutes = require("./routes/electionRoutes");
const voteRoutes = require("./routes/voteRoutes");

// Use the routers
app.get("/", (req, res) => {
  res.send("Hello from server");
  
});
// Serve uploaded files statically
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);
app.use("/election", electionRoutes);
app.use("/vote", voteRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Global error handlers to surface any uncaught errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  // Optional: process.exit(1) to crash and restart under a process manager
});
