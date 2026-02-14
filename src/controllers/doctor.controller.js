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

    res.status(200).json({
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
const getAllDoctor = asyncHandler(async (req, res, next) => {
  try {
    const doctors = await DoctorCollection.find().populate(
      "user",
      "fullName email avatar role",
    );

    res.status(200).json({
      success: true,
      message: "Fetch all Doctor Successfully",
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// & -----------------------------getDoctorById-----------------------------

//Get Single Doctor
const getDoctorById = asyncHandler(async (req, res, next) => {
  try {
    const doctor = await DoctorCollection.findById(req.params.id).populate(
      "user",
      "fullName email avatar",
    );

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetch Single Doctor Successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// & -----------------------------updateDoctorProfile-----------------------------

// Update Doctor Profile (Doctor himself)
const updateDoctorProfile = asyncHandler(async (req, res, next) => {
  try {
    const doctor = await DoctorCollection.findOne({ user: req.user.id });
    console.log("Logged In User ID:", req.user.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    const allowedFields = [
      "specialization",
      "experience",
      "consultationFee",
      "qualification",
      "bio",
    ];

    // Update only allowed fields
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        doctor[field] = req.body[field];
      }
    });
    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const DeleteDoctor = asyncHandler(async (req, res, next) => {});

module.exports = {
  createDoctor,
  getAllDoctor,
  getDoctorById,
  updateDoctorProfile,
  DeleteDoctor,
};
