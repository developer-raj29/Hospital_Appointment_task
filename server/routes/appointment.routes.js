const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  cancelAppointment,
  getAppointments,
  getAppointmentsByDoctor,
  getAppointmentsByPatient,
  markAsCompleted,
} = require("../controllers/appointment.controller");

const { auth } = require("../middlewares/auth.middleware");
const { isDoctor, isPatient } = require("../middlewares/role.middleware");

// Protected Routes
router.post("/booking", isPatient, bookAppointment); // Book new appointment by patient
router.delete("/cancel/:id", cancelAppointment); // Cancel appointment by patient
router.put("/complete/:id", isDoctor, markAsCompleted);

router.get("/all-appointments", auth, getAppointments); // Get all appointments for doctor
router.get("/doctor", auth, isDoctor, getAppointmentsByDoctor); // Doctor's appointments
router.get("/patient", auth, isPatient, getAppointmentsByPatient); // Patient's appointments

module.exports = router;
