const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErrorHandler.utils");
const PatientCollection = require("../models/Patient.model");
const DoctorCollection = require("../models/doctor.model");
const AppointmentCollection = require("../models/appointment.model");

// &-------------------------Book Appointment (PATIENT)----------------------
const bookAppointment = asyncHandler(async (req, res, next) => {
  const { doctorId, appointmentDate, timeSlot, reason } = req.body;

  // 1 Basic validation
  if (!doctorId || !appointmentDate || !timeSlot) {
    return next(new ErrorHandler("All required fields must be provided", 400));
  }

  // 2️ Check Patient Profile
  const patient = await PatientCollection.findOne({ user: req.user.id });
  if (!patient) {
    return next(new ErrorHandler("Patient profile not found", 404));
  }

  // 3️ Check Doctor
  const doctor = await DoctorCollection.findOne({
    _id: doctorId,
    isAvailable: true,
  });

  if (!doctor) {
    return next(new ErrorHandler("Doctor not found or inactive", 404));
  }

  // 4️ Prevent Past Date Booking
  const today = new Date();
  const selectedDate = new Date(appointmentDate);

  if (selectedDate < today.setHours(0, 0, 0, 0)) {
    return next(new ErrorHandler("Cannot book appointment for past date", 400));
  }

  // 5️ Check if Slot Already Booked
  const existingAppointment = await AppointmentCollection.findOne({
    doctor: doctorId,
    appointmentDate,
    timeSlot,
    status: { $ne: "cancelled" },
  });

  if (existingAppointment) {
    return next(new ErrorHandler("This time slot is already booked", 400));
  }

  // 6️ Create Appointment
  const appointment = await AppointmentCollection.create({
    patient: patient.id,
    doctor: doctor.id,
    appointmentDate,
    timeSlot,
    reason,
    status: "PENDING",
  });

  res.status(200).json({
    success: true,
    message: "Appointment booked successfully",
    appointment,
  });
});

// &-------------------------Get My Appointments (PATIENT)----------------------

const getMyAppointments = asyncHandler(async (req, res, next) => {
  const patient = await PatientCollection.findOne({ user: req.user.id });

  const appointments = await AppointmentCollection.find({
    patient: patient.id,
  })
    .populate(
      "doctor",
      "specialization consultationFee experience qualification isAvailable",
    )
    .sort({ appointmentDate: -1 });

  res.status(200).json({
    success: true,
    count: appointments.length,
    appointments,
  });
});

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
