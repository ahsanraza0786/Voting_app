const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const db = require("./db");
const { jwtAuthMiddleware } = require("./jwt");

// ---------- CORS CONFIGURATION ----------
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "http://localhost:300",
  "https://voting-app-rust.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (process.env.NODE_ENV !== "production") return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// ---------- STATIC FILES ----------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------- ROUTES ----------
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const electionRoutes = require("./routes/electionRoutes");
const voteRoutes = require("./routes/voteRoutes");
const googleRoutes = require("./routes/googleRoutes"); // Google OAuth routes

// Mount main routes
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);
app.use("/election", electionRoutes);
app.use("/vote", voteRoutes);

// Mount Google OAuth routes under /api/auth
app.use("/api/auth", googleRoutes);

// ---------- TEST ROUTE ----------
app.get("/", (req, res) => {
  res.send("Hello from server");
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// ---------- GLOBAL ERROR HANDLERS ----------
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
});
