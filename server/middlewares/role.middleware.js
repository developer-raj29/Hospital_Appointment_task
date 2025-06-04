const ROLE = require("../utils/constant");

exports.isDoctor = (req, res, next) => {
  if (req.user.role !== ROLE.DOCTOR) {
    return res.status(403).json({
      success: false,
      message: "Access denied: Doctors only",
    });
  }
  next();
};

exports.isPatient = (req, res, next) => {
  if (req.user.role !== ROLE.PATIENT) {
    return res.status(403).json({
      success: false,
      message: "Access denied: Patients only",
    });
  }
  next();
};
