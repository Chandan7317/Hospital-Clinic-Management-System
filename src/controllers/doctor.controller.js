const asyncHandler = require("express-async-handler");
const UserCollection = require("../models/user.model");
const DoctorCollection = require("../models/doctor.model");
// &-----------------------------createDoctor--------------------
//  Create Doctor Profile (Admin only)
const createDoctor = asyncHandler(async (req, res, next) => {
  try {
    const {
      userId,
      specialization,
      experience,
      consultationFee,
      qualification,
      bio,
    } = req.body;

    const user = await UserCollection.findById(userId);

    if (!user || user.role !== "DOCTOR") {
      return res.status(400).json({
        message: "User must have DOCTOR role",
      });
    }

    const existingProfile = await DoctorCollection.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({
        message: "Doctor profile already exists",
      });
    }

    const doctor = await DoctorCollection.create({
      user: userId,
      specialization,
      experience,
      consultationFee,
      qualification,
      bio,
    });

    res.status(201).json({
      success: true,
      message: "Doctor profile created",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// & -----------------------------getAllDoctor-----------------------------
// Get All Doctors (Public)
const getAllDoctor = asyncHandler(async (req, res, next) => {});
//Get Single Doctor
const getDoctorById = asyncHandler(async (req, res, next) => {});
// Update Doctor Profile (Doctor himself)
const updateDoctorProfile = asyncHandler(async (req, res, next) => {});

const DeleteDoctor = asyncHandler(async (req, res, next) => {});

module.exports = {
  createDoctor,
  getAllDoctor,
  getDoctorById,
  updateDoctorProfile,
  DeleteDoctor,
};
