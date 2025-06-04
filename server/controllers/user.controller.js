const User = require("../models/user.model");

// Get logged-in user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id; // ✅ fix here

    const user = await User.findById(userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      _id,
      firstName,
      lastName,
      contactNumber,
      gender,
      age,
      availability,
    } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const updateData = {
      firstName,
      lastName,
      contactNumber,
      gender,
      age,
    };

    // Add availability only if user is a doctor and it's provided
    if (availability) {
      updateData.availability = availability;
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        user_Op: "D",
        end_date: new Date(),
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile marked as deleted",
      user,
    });
  } catch (error) {
    console.error("Delete Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete profile",
      error: error.message,
    });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      message: "All users fetched",
      users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// Get all doctors (for patients)
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "Doctor" }).select("-password");

    return res.status(200).json({
      success: true,
      message: "All doctors fetched",
      doctors,
    });
  } catch (error) {
    console.error("Get All Doctors Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};

// Get all patients (for doctors)
exports.getAllPatient = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("-password");

    return res.status(200).json({
      success: true,
      message: "All patients fetched",
      patients,
    });
  } catch (error) {
    console.error("Get All Patients Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch patients",
      error: error.message,
    });
  }
};
