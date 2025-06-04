const mongoose = require("mongoose");
const ROLE = require("../utils/constant");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Patient", "Doctor"],
      required: true,
    },
    // Doctor-specific fields only
    specialization: {
      type: String,
      required: function () {
        return this.role === ROLE.DOCTOR;
      },
    },
    availability: [
      {
        day: String, // e.g. "Monday"
        slots: [String], // e.g. ["10:00 AM", "11:00 AM"]
      },
    ],
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    contactNumber: {
      type: String,
      unique: true,
      require: [true, "Contact no. is required"],
    },
    user_Op: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    end_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
