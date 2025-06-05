import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AvailabilityInput } from "../components/AvailabilityInput";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    contactNumber: "",
    gender: "",
    age: "",
    specialization: "",
    availability: daysOfWeek.slice(0, 5).map((day) => ({
      day,
      slots: [""],
    })),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      role,
      contactNumber,
      gender,
      age,
      specialization,
      availability,
    } = formData;

    // Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      !contactNumber ||
      !gender ||
      !age
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (role === "Doctor" && (!specialization || !availability)) {
      toast.error("Please fill in Doctor-specific fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/signup",
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          role,
          contactNumber,
          gender,
          age,
          ...(role === "Doctor" && { specialization, availability }),
        }
      );

      if (response.data.success) {
        toast.success("Signup Successful ✅");
        console.log("Signup Details:", formData);
        // You can save token or redirect here if backend returns it
        // localStorage.setItem("token", response.data.token);
        navigate("/login");
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          📝 Create a New Account
        </Typography>

        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          autoComplete="off"
          sx={{ mt: 2 }}
        >
          <Box display={"flex"} gap={2}>
            <TextField
              label="First Name"
              fullWidth
              required
              onChange={changeHandler}
              name="firstName"
              value={formData.firstName}
            />
            <TextField
              label="Last Name"
              fullWidth
              required
              onChange={changeHandler}
              name="lastName"
              value={formData.lastName}
            />
          </Box>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            required
            onChange={changeHandler}
            name="email"
            value={formData.email}
          />

          <Box display={"flex"} gap={2}>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              margin="normal"
              onChange={changeHandler}
              name="password"
              value={formData.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              required
              margin="normal"
              onChange={changeHandler}
              name="confirmPassword"
              value={formData.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TextField
            label="Contact Number"
            fullWidth
            margin="normal"
            required
            onChange={changeHandler}
            name="contactNumber"
            value={formData.contactNumber}
          />

          <Box display={"flex"} gap={2}>
            <TextField
              label="Role"
              select
              fullWidth
              margin="normal"
              required
              onChange={changeHandler}
              name="role"
              value={formData.role}
            >
              <MenuItem value="Doctor">Doctor</MenuItem>
              <MenuItem value="Patient">Patient</MenuItem>
            </TextField>

            <TextField
              label="Gender"
              select
              fullWidth
              margin="normal"
              required
              onChange={changeHandler}
              name="gender"
              value={formData.gender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>

            <TextField
              label="Age"
              fullWidth
              margin="normal"
              required
              onChange={changeHandler}
              name="age"
              value={formData.age}
            />
          </Box>

          {formData.role === "Doctor" && (
            <Box display={"flex"} gap={2} flexDirection={"column"}>
              <TextField
                label="Specialization"
                fullWidth
                margin="normal"
                required
                onChange={changeHandler}
                name="specialization"
                value={formData.specialization}
              />
              <AvailabilityInput
                availability={formData.availability}
                setAvailability={(newAvailability) =>
                  setFormData((prev) => ({
                    ...prev,
                    availability: newAvailability,
                  }))
                }
              />
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
