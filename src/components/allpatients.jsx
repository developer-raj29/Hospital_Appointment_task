import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Stack,
  Chip,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from "axios";
import { toast } from "react-toastify";

const AllPatients = () => {
  const [appointments, setAppointments] = useState([]);

  const doctorId = localStorage.getItem("userId")
    ? JSON.parse(localStorage.getItem("userId"))
    : null;

  const fetchAppointments = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        `http://localhost:8000/api/appointment/doctor/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments.");
    }
  };

  const completeAppointments = async (appointmentId) => {
    console.log("appointmentId: ", appointmentId);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.put(
        `http://localhost:8000/api/appointment/complete/${appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Appointment marked as complete");
      fetchAppointments();
    } catch (error) {
      console.error("Error completing appointment:", error);
      toast.error("Failed to complete appointment.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Box p={4} bgcolor="#f5f5f5" minHeight="100vh">
      <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
        All Appointments
      </Typography>

      <Grid container spacing={3}>
        {appointments.length === 0 ? (
          <Typography variant="body1" mt={4}>
            No appointments found for this doctor.
          </Typography>
        ) : (
          appointments.map((appointment) => {
            const patient = appointment.patientId;

            return (
              <Grid item xs={12} sm={6} md={4} key={appointment._id}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      mb={2}
                    >
                      <Avatar
                        sx={{ width: 56, height: 56 }}
                        src={`https://api.dicebear.com/5.x/initials/svg?seed=${patient.firstName}${patient.lastName}`}
                      />
                      <Box>
                        <Typography variant="h6">
                          {patient.firstName} {patient.lastName}
                        </Typography>
                        <Typography color="text.secondary">
                          Age: {patient.age} | Gender: {patient.gender}
                        </Typography>
                      </Box>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                      Email: {patient.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Contact: {patient.contactNumber}
                    </Typography>

                    <Typography variant="body2" mt={1}>
                      Date: {new Date(appointment.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      Time: {appointment.timeSlot}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      Status:{" "}
                      <Chip
                        label={appointment.status}
                        color={
                          appointment.status === "booked"
                            ? "warning"
                            : "success"
                        }
                        size="small"
                      />
                    </Typography>

                    {/* <Button
                      fullWidth
                      variant="contained"
                      startIcon={<CalendarMonthIcon />}
                      sx={{ mt: 2 }}
                      onClick={() =>
                        alert(`Book appointment for ${patient.firstName}`)
                      }
                    >
                      Book Another
                    </Button> */}
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<CalendarMonthIcon />}
                      sx={{ mt: 2 }}
                      onClick={() => completeAppointments(appointment._id)}
                    >
                      Mark as Completed
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default AllPatients;
