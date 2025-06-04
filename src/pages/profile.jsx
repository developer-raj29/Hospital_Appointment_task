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
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const Profile = () => {
  const { id } = useParams();
  console.log("id: ", id);

  const [initialUser, setInitialUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    if (initialUser) {
      setFormData({
        firstName: initialUser.firstName,
        lastName: initialUser.lastName,
        age: initialUser.age,
        gender: initialUser.gender,
        contactNumber: initialUser.contactNumber,
      });
    }
  };

  const GetUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/profile/${id}`
      );

      if (response.data.success) {
        const user = response.data.user;
        setInitialUser(user);
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          age: user.age || "",
          gender: user.gender || "",
          contactNumber: user.contactNumber || "",
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while fetching profile."
      );
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const updatedUser = { ...formData, _id: id };

      const response = await axios.put(
        `http://localhost:8000/api/user/update-profile`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
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
