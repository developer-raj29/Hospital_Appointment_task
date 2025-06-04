import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (initialUser) {
      setFormData({
        firstName: initialUser.firstName || "",
        lastName: initialUser.lastName || "",
        age: initialUser.age || "",
        gender: initialUser.gender || "",
        contactNumber: initialUser.contactNumber || "",
      });
    }
  }, [initialUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      firstName: initialUser.firstName,
      lastName: initialUser.lastName,
      age: initialUser.age,
      gender: initialUser.gender,
      contactNumber: initialUser.contactNumber,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const updatedUser = { ...initialUser, ...formData };

      const token = JSON.parse(localStorage.getItem("token")); // optional if using JWT

      const response = await axios.put(
        `http://localhost:8000/api/user/update-profile`, // Replace with your real endpoint
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Only if your backend expects a token
          },
        }
      );

      if (response.data.success) {
        // Save updated user data in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong while updating."
      );
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f4f8"
      px={2}
    >
      <Card
        sx={{ maxWidth: 500, width: "100%", borderRadius: 4, boxShadow: 4 }}
      >
        <CardContent>
          <Typography variant="h5" align="center" fontWeight="bold" mb={2}>
            Edit Profile
          </Typography>

          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            autoComplete="off"
            sx={{ mt: 2 }}
          >
            <Stack spacing={2}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Gender"
                name="gender"
                select
                value={formData.gender}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
              <TextField
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                fullWidth
              />
            </Stack>

            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                // onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
