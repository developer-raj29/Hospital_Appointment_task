import { Box, TextField, IconButton, Button, Typography } from "@mui/material";
import { useState } from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const AvailabilityInput = ({ availability, setAvailability }) => {
  const handleSlotChange = (dayIndex, slotIndex, value) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].slots[slotIndex] = value;
    setAvailability(newAvailability);
  };

  const addSlot = (dayIndex) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].slots.push("");
    setAvailability(newAvailability);
  };

  const removeSlot = (dayIndex, slotIndex) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].slots.splice(slotIndex, 1);
    setAvailability(newAvailability);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {availability.map((dayObj, dayIndex) => (
        <Box key={dayObj.day} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {dayObj.day}
          </Typography>

          {dayObj.slots.map((slot, slotIndex) => (
            <Box
              key={slotIndex}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <TextField
                label="Time Slot (e.g., 10:00 AM)"
                value={slot}
                onChange={(e) =>
                  handleSlotChange(dayIndex, slotIndex, e.target.value)
                }
                size="small"
                sx={{ flexGrow: 1 }}
              />
              <IconButton
                color="error"
                onClick={() => removeSlot(dayIndex, slotIndex)}
                disabled={dayObj.slots.length === 1}
              >
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          ))}

          <Button
            variant="outlined"
            startIcon={<AddCircleOutline />}
            onClick={() => addSlot(dayIndex)}
          >
            Add Slot
          </Button>
        </Box>
      ))}
    </Box>
  );
};
