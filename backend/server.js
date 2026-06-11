const express = require("express");
const cors = require("cors");
const path = require("path");
const { initializeDatabase } = require("./db");

// Import routes
const donorRoutes = require("./routes/donorRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const donationRoutes = require("./routes/donationRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, "../frontend")));

// API Routes
app.use("/api/donors", donorRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/requests", requestRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Blood Donation Management System API is running",
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/donors", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/donors.html"));
});

app.get("/hospitals", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/hospitals.html"));
});

app.get("/donations", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/donations.html"));
});

app.get("/requests", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/requests.html"));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
});

// Initialize database and start server
async function startServer() {
  try {
    console.log("Initializing database...");
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(
        `🩸 Blood Donation Management System server running on port ${PORT}`
      );
      console.log(`📱 Frontend: http://localhost:${PORT}`);
      console.log(`🔗 API: http://localhost:${PORT}/api`);
      console.log(`❤️  Health Check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Shutting down gracefully...");
  process.exit(0);
});

startServer();
