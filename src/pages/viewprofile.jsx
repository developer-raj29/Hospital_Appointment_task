import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  CircularProgress,
  Grid,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const ViewProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // doctor id from route

  const fetchDoctor = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        `http://localhost:8000/api/user/profile/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response: ", response);
      setDoctor(response.data.user); // updated key from `doctor` to `user`
    } catch (error) {
      toast.error("Failed to fetch doctor profile.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!doctor) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h6" color="error">
          Doctor profile not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Paper
        elevation={3}
        sx={{ maxWidth: 900, margin: "0 auto", p: 4, borderRadius: 3 }}
      >
        <Stack direction="row" spacing={4} alignItems="center">
          <Avatar
            alt={`${doctor.firstName} ${doctor.lastName}`}
            src={`https://api.dicebear.com/5.x/initials/svg?seed=${doctor.firstName}${doctor.lastName}`}
            sx={{ width: 100, height: 100 }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Dr. {doctor.firstName} {doctor.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {doctor.specialization}
            </Typography>
            <Typography variant="body2" mt={0.5}>
              Age: {doctor.age} | Gender: {doctor.gender}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Email:</strong> {doctor.email}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Contact:</strong> {doctor.contactNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Role:</strong> {doctor.role}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Joined On:</strong>{" "}
              {new Date(doctor.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Weekly Availability
        </Typography>

        {doctor.availability?.length > 0 ? (
          doctor.availability.map((day) => (
            <Box key={day._id} mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                {day.day}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                {day.slots.map((slot, index) => (
                  <Chip key={index} label={slot} color="primary" size="small" />
                ))}
              </Stack>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary">No availability set.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ViewProfile;
