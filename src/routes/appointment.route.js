const { Router } = require("express");
const { bookAppointment, getMyAppointments, getDoctorAppointments } = require("../controllers/appointment.controller");
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
  bookAppointment
);

router.get(
  "/myApointment",
  isLoggedIn,
  authorizeRoles("PATIENT"),
  getMyAppointments
);

// Doctor routes
router.get(
  "/getdoctorAppointment",
  isLoggedIn,
  authorizeRoles("DOCTOR"),
  getDoctorAppointments
);
module.exports = router;
