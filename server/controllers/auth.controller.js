const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const ROLE = require("../utils/constant");
const JWT = require("jsonwebtoken");

// Signup Controller for Registration User
exports.signup = async (req, res) => {
  try {
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
    } = req.body;

    // Basic validation
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
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already registered",
      });
    }

    // Doctor-specific check
    if (role === ROLE.DOCTOR && !specialization) {
      return res.status(400).json({
        success: false,
        message: "Specialization is required for doctors",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNumber,
      gender,
      age,
      role,
      specialization: role === ROLE.DOCTOR ? specialization : undefined,
      availability: role === ROLE.DOCTOR ? availability : [],
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Error in Sign up:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Try again later.",
      error: error.message,
    });
  }
};

// Login Controller for Logged in user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (email, password) are required",
      });
    }

    // Find the user by email and contactNumber
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Create payload for token
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    // Generate JWT token
    const token = JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    // Exclude password from returned user object
    user.password = undefined;

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    };

    // Send response
    return res.cookie("token", token, options).status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again later.",
      error: error.message,
    });
  }
};
