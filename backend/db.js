const mongoose = require("mongoose");
require("dotenv").config();

// Define the MongoDB connection URL
const mongoURL = process.env.MONGO_URI; // Replace 'Voters' with your database name, or use process.env.MONGODB_URL for environment variable
//const mongoURL =process.env.MONGODB_URL_LOCAL;
// Set up MongoDB connection
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB server");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Get the default connection of data base 
const db = mongoose.connection;

// Define event listeners for database connection
db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export the database connection
module.exports = db;
