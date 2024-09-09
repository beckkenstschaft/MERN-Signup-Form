const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

// Initialize app and middleware
const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api/users", userRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
