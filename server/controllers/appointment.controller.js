const Appointment = require("../models/appointment.model");
const User = require("../models/user.model");

// Book a new appointment by a patient
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, day, timeSlot } = req.body;
    const patientId = req.body.user._id;

    if (!doctorId || !date || !day || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: "All fields (doctorId, date, day, timeSlot) are required",
      });
    }

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "Doctor") {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Check availability
    const availability = doctor.availability.find((d) => d.day === day);
    if (!availability || !availability.slots.includes(timeSlot)) {
      return res.status(400).json({
        success: false,
        message: "Selected time slot is not available for the chosen day",
      });
    }

    const existingAppointment = await Appointment.findOne({
      doctorId,
      date,
      timeSlot,
      status: "booked",
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "This slot is already booked",
      });
    }

    const newAppointment = await Appointment.create({
      doctorId,
      patientId,
      date,
      day,
      timeSlot,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Book Appointment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to book appointment",
      error: error.message,
    });
  }
};

// Cancel an appointment (by ID)
exports.cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = "cancelled";
    await appointment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    console.error("Cancel Appointment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to cancel appointment",
      error: error.message,
    });
  }
};

exports.markAsCompleted = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "completed" },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment marked as completed",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Mark as completed error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get all appointments (admin or staff maybe)
exports.getAppointments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filters = {};

    if (status) filters.status = status;

    const appointments = await Appointment.find(filters)
      .populate("doctorId", "firstName lastName email specialization")
      .populate("patientId", "firstName lastName email age gender")
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Appointment.countDocuments(filters);

    res.status(200).json({
      success: true,
      message: "All Appointments fetched successfully",
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      appointments,
    });
  } catch (error) {
    console.error("Get Appointments Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

// Get appointments for the logged-in doctor
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const appointments = await Appointment.find({ doctorId })
      .populate(
        "patientId",
        "firstName lastName email gender age contactNumber"
      )
      .sort({ date: 1 });

    return res.status(200).json({
      success: true,
      message: "Doctor's appointments fetched",
      appointments,
    });
  } catch (error) {
    console.error("Doctor Appointments Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch doctor's appointments",
      error: error.message,
    });
  }
};

// Get appointments for the logged-in patient
exports.getAppointmentsByPatient = async (req, res) => {
  try {
    const patientId = req.user.id;

    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "firstName lastName email specialization")
      .sort({ date: 1 });

    return res.status(200).json({
      success: true,
      message: "Patient's appointments fetched",
      appointments,
    });
  } catch (error) {
    console.error("Patient Appointments Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch patient's appointments",
      error: error.message,
    });
  }
};
