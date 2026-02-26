const asyncHandler = require("express-async-handler");


// & ---------------------Create Patient Profile-----------------------
const createPatientProfile = asyncHandler(async (req, res, next) => {});

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
