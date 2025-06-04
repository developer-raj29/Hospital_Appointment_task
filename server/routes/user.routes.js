const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/auth.controller");
const {
  getAllUsers,
  getProfile,
  getAllDoctors,
  getAllPatient,
} = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth.middleware");
const {
  updateProfile,
  deleteProfile,
} = require("../controllers/user.controller");

// Routes
router.post("/signup", signup);
router.post("/login", login);

// Protected Routes
router.get("/profile/:id", getProfile); // Get own profile Logged-in user's profile
router.put("/update-profile", updateProfile); //
router.post("/delete-profile", deleteProfile); //

router.get("/users", auth, getAllUsers); // Get all users List (doctor/patient) for Admin view

router.get("/all-doctors", getAllDoctors); // Get all Doctor: List for Patient
router.get("/all-patients", auth, getAllPatient); // Get all Patient: List for Doctors

module.exports = router;
