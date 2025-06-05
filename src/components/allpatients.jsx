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
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);

  const id = localStorage.getItem("userId")
    ? JSON.parse(localStorage.getItem("userId"))
    : null;

  console.log("id: ", id);

  // Sample fetch from backend
  const fetchPatients = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        `http://localhost:8000/api/appointment/doctor/${id}`, // or remove id if not needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response: ", response);

      setPatients(response.data.patients || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast.error("Failed to load patients.");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <Box p={4} bgcolor="#f5f5f5" minHeight="100vh">
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        All Patients
      </Typography>

      <Grid container spacing={3}>
        {patients.length === 0 ? (
          <Typography variant="body1" color="text.secondary" mt={4}>
            No patients found for this doctor.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {patients.map((patient) => (
              <Grid item xs={12} sm={6} md={4} key={patient._id}>
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
                      Contact: {patient.contactNumber}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<CalendarMonthIcon />}
                      sx={{ mt: 2 }}
                      onClick={() =>
                        alert(`Book appointment for ${patient.firstName}`)
                      }
                    >
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AllPatients;
