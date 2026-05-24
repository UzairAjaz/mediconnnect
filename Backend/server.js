const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth",         require("./routes/auth.routes"));
app.use("/api/doctors",      require("./routes/doctor.routes"));
app.use("/api/appointments", require("./routes/appointment.routes"));
app.use("/api/admin",        require("./routes/admin.routes"));
app.use("/api/contact",      require("./routes/contact.routes"));
app.use("/api/password",     require("./routes/password.routes"));

// Health check
app.get("/", (req, res) => res.json({ message: "MediConnect API is running" }));

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));