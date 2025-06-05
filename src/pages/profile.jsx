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
  IconButton,
  Divider,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const Profile = () => {
  const { id } = useParams();
  const [initialUser, setInitialUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    specialization: "",
    availability: [],
  });

  const isDoctor = initialUser?.role === "Doctor";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updated = [...formData.availability];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, availability: updated }));
  };

  const handleSlotChange = (index, slotIndex, value) => {
    const updated = [...formData.availability];
    updated[index].slots[slotIndex] = value;
    setFormData((prev) => ({ ...prev, availability: updated }));
  };

  const addAvailabilityDay = () => {
    setFormData((prev) => ({
      ...prev,
      availability: [...prev.availability, { day: "", slots: [""] }],
    }));
  };

  const removeAvailabilityDay = (index) => {
    const updated = [...formData.availability];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, availability: updated }));
  };

  const addSlot = (index) => {
    const updated = [...formData.availability];
    updated[index].slots.push("");
    setFormData((prev) => ({ ...prev, availability: updated }));
  };

  const removeSlot = (dayIndex, slotIndex) => {
    const updated = [...formData.availability];
    updated[dayIndex].slots.splice(slotIndex, 1);
    setFormData((prev) => ({ ...prev, availability: updated }));
  };

  const handleCancel = () => {
    if (initialUser) {
      setFormData({
        firstName: initialUser.firstName,
        lastName: initialUser.lastName,
        age: initialUser.age,
        gender: initialUser.gender,
        email: initialUser.email,
        contactNumber: initialUser.contactNumber,
        specialization: initialUser.specialization || "",
        availability: initialUser.availability || [],
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
          email: user.email || "",
          contactNumber: user.contactNumber || "",
          specialization: user.specialization || "",
          availability: user.availability || [],
        });
      }
    } catch (error) {
      toast.error("Failed to fetch profile.");
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const payload = {
        ...formData,
        _id: id,
      };

      const response = await axios.put(
        `http://localhost:8000/api/user/update-profile`,
        payload,
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
      toast.error("Something went wrong while updating.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" py={5} px={2}>
      <Card sx={{ maxWidth: 950, width: "100%", p: 3, borderRadius: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Edit Profile
          </Typography>

          <form onSubmit={submitHandler}>
            <Stack spacing={2}>
              <Box display={"flex"} gap={2}>
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
              </Box>
              <Box display={"flex"} gap={2}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  label="Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  fullWidth
                />

                {isDoctor && (
                  <TextField
                    label="Specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    fullWidth
                  />
                )}
              </Box>

              {isDoctor && (
                <>
                  <Typography variant="h6" mt={2}>
                    Availability
                  </Typography>

                  {formData.availability.map((dayObj, index) => (
                    <Box
                      key={index}
                      sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <TextField
                          label="Day"
                          value={dayObj.day}
                          onChange={(e) =>
                            handleAvailabilityChange(
                              index,
                              "day",
                              e.target.value
                            )
                          }
                        />
                        <IconButton
                          onClick={() => removeAvailabilityDay(index)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>

                      <Box display={"flex"} flexWrap={"wrap"} gap={3}>
                        {dayObj.slots.map((slot, sIndex) => (
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            key={sIndex}
                            mt={1}
                          >
                            <TextField
                              label={`Slot ${sIndex + 1}`}
                              value={slot}
                              onChange={(e) =>
                                handleSlotChange(index, sIndex, e.target.value)
                              }
                            />
                            <IconButton
                              onClick={() => removeSlot(index, sIndex)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        ))}
                      </Box>

                      <Button
                        variant="outlined"
                        onClick={() => addSlot(index)}
                        startIcon={<AddCircleOutlineIcon />}
                        sx={{ mt: 1 }}
                      >
                        Add Slot
                      </Button>
                    </Box>
                  ))}

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={addAvailabilityDay}
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    Add Availability Day
                  </Button>
                </>
              )}

              <Divider sx={{ my: 3 }} />

              <Box display="flex" justifyContent="space-between">
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
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
