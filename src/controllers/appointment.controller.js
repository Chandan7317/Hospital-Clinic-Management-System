const asyncHandler = require("express-async-handler");

// &-------------------------Book Appointment (PATIENT)----------------------
const bookAppointment = asyncHandler(async (req, res, next) => {});

// &-------------------------Get My Appointments (PATIENT)----------------------

const getMyAppointments = asyncHandler(async (req, res, next) => {});

// &-------------------------Doctor View Appointments----------------------

const getDoctorAppointments = asyncHandler(async (req, res, next) => {});
// &-------------------------Doctor Update Appointment Status----------------------

const updateAppointmentStatus = asyncHandler(async (req, res, next) => {});

// &-------------------------Soft Delete Appointment----------------------

const deleteAppointment = asyncHandler(async (req, res, next) => {});

// &------------------------- Admin - Get All Appointments----------------------
const getAllAppointments = asyncHandler(async (req, res, next) => {});

module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  getAllAppointments,
};
