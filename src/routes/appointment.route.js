const { Router } = require("express");
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
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

module.exports = router;
