const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;
const DB = require("./config/db");
const cors = require("cors");

DB();

const userRoutes = require("./routes/user.routes");
const appointmentRoutes = require("./routes/appointment.routes");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Route mounting
app.use("/api/user", userRoutes);
app.use("/api/appointment", appointmentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Server Start Hospital Appointment System project",
  });
});

app.listen(PORT, () => {
  console.log(
    `Hospital Appointment Server Start Successfully on PORT : ${PORT}`
  );
});
