import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const { id } = useParams(); // doctor ID from URL
  const [doctor, setDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/user/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctor(response.data.user); // 👈 corrected from .doctor to .user
      } catch (err) {
        console.error("Error fetching doctor:", err);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDay || !selectedTime || !date)
      return alert("Please select all fields");

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, please login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/appointment/booking",
        {
          doctorId: id,
          date,
          day: selectedDay,
          timeSlot: selectedTime, // ✅ renamed
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Appointment booked successfully!");
        // Optional: Redirect or reset form
      } else {
        alert("Booking failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong during booking.");
    }
  };

  // Find slots for the selected day
  const availableSlots =
    doctor?.availability.find((item) => item.day === selectedDay)?.slots || [];

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Book Appointment
        </Typography>

        {doctor && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={500}>
              Dr. {doctor.firstName} {doctor.lastName}
            </Typography>
            <Typography color="text.secondary">
              {doctor.specialization} | {doctor.gender}, Age: {doctor.age}
            </Typography>
            <Typography color="text.secondary">
              Contact: {doctor.contactNumber}
            </Typography>
          </Box>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Select Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Select Day"
            select
            value={selectedDay}
            onChange={(e) => {
              setSelectedDay(e.target.value);
              setSelectedTime(""); // reset time on day change
            }}
            sx={{ mb: 2 }}
          >
            {doctor?.availability.map((item) => (
              <MenuItem key={item.day} value={item.day}>
                {item.day}
              </MenuItem>
            ))}
          </TextField>

          {selectedDay && (
            <TextField
              fullWidth
              label="Available Time Slots"
              select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              sx={{ mb: 3 }}
            >
              {availableSlots.length > 0 ? (
                availableSlots.map((slot, i) => (
                  <MenuItem key={i} value={slot}>
                    {slot}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No slots available</MenuItem>
              )}
            </TextField>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!selectedDay || !selectedTime || !date}
          >
            Confirm Booking
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Booking;
