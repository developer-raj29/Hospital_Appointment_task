const ROLE = require("../utils/constant");

exports.isDoctor = (req, res, next) => {
  if (req.user.role !== "Doctor") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Doctors only",
    });
  }
  next();
};

exports.isPatient = (req, res, next) => {
  const user = req.body.user.role;
  if (user !== "Patient") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Patients only",
    });
  }
  next();
};
