const asyncHandler = require("express-async-handler");
const PatientCollection = require("../models/Patient.model");
const ErrorHandler = require("../utils/ErrorHandler.utils");

// & ---------------------Create Patient Profile-----------------------
const createPatientProfile = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.user;
  const { age, gender, bloodGroup, phone, address, medicalHistory } = req.body;

  const existingPatient = await PatientCollection.findOne({
    userId,
  });

  if (existingPatient) {
    return next(new ErrorHandler("Patient profile already exists", 400));
  }

  // 🔹 Required Field Check
  if (!age || !gender || !bloodGroup || !phone || !address) {
    return next(new ErrorHandler("Please fill all required fields", 400));
  }

  // 🔹 Age Validation
  if (typeof age !== "number" || age < 1 || age > 120) {
    return next(new ErrorHandler("Age must be between 1 and 120", 400));
  }

  if (!["Male", "Female", "Other"].includes(gender)) {
    return next(new ErrorHandler("Invalid gender value", 400));
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    return next(new ErrorHandler("Invalid phone number", 400));
  }

  const patient = await PatientCollection.create({
    user: userId,
    age,
    gender,
    bloodGroup,
    phone,
    address,
    medicalHistory,
  });

  res.status(200).json({
    success: true,
    message: "Patient profile created successfully",
    patient,
  });
});

// & ---------------------Get My Profile-----------------------

const getMyProfile = asyncHandler(async (req, res, next) => {});

// & ---------------------Update Patient Profile-----------------------

const updatePatientProfile = asyncHandler(async (req, res, next) => {});

// & ---------------------Soft Delete Patient-----------------------

const deletePatientProfile = asyncHandler(async (req, res, next) => {});

// & ---------------------Admin Get All Patients-----------------------

const getAllPatients = asyncHandler(async (req, res, next) => {});

module.exports = {
  createPatientProfile,
  getMyProfile,
  updatePatientProfile,
  deletePatientProfile,
  getAllPatients,
};
