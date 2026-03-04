const { Router } = require("express");
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  getAllAppointments,
  deleteAppointment,
} = require("../controllers/appointment.controller");
const {
  isLoggedIn,
  authorizeRoles,
} = require("../middlewares/outh.middleware");

const router = Router();

// Patient routes
router.post(
  "/bookApointment",
  isLoggedIn,
  authorizeRoles("PATIENT"),
  bookAppointment,
);

router.get(
  "/myApointment",
  isLoggedIn,
  authorizeRoles("PATIENT"),
  getMyAppointments,
);

// Doctor routes
router.get(
  "/viewdoctorAppointment",
  isLoggedIn,
  authorizeRoles("DOCTOR"),
  getDoctorAppointments,
);

router.put(
  "/doctor/update/Appointment/status/:id",
  isLoggedIn,
  authorizeRoles("DOCTOR"),
  updateAppointmentStatus,
);

// Common delete
router.delete("/deleteAppointment/:id", isLoggedIn, deleteAppointment);

// Admin routes
router.get(
  "/admin/all/Appointments",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  getAllAppointments,
);
module.exports = router;
