const asyncHandler = require("express-async-handler");
const DoctorCollection = require("../models/doctor.model");
const PatientCollection = require("../models/Patient.model");
const MedicalRecordCollection = require("../models/medicalrecord.model");
// & ---------------------------Add Diagnosis------------------------
const addDiagnosis = asyncHandler(async (req, res, next) => {
    const { patientId, appointmentId, diagnosis, notes } = req.body;
    const { _id: userId } = req.user;

    const doctor = await DoctorCollection.findOne({ user: userId });
    const patient = await PatientCollection.findById(patientId);

    if (!doctor) {
        return next(new ErrorHandler("Doctor profile not found", 404));
    }

    if (!patient) {
        return next(new ErrorHandler("Patient not found", 404));
    }

    const record = await MedicalRecordCollection.create({
        doctorId: doctor.id,
        patientId: patient.id,
        appointmentId: appointmentId,
        diagnosis,
        notes
    });

    res.status(201).json({
        success: true,
        message: "Diagnosis added successfully",
        data: record
    });
})

// & ---------------------------Add Prescription------------------------

const addPrescription = asyncHandler(async (req, res, next) => {
})

// & ---------------------------Upload Medical Reports------------------------

const uploadReport = asyncHandler(async (req, res, next) => {
})

// & ---------------------------Get Patient Medical History------------------------

const getPatientHistory = asyncHandler(async (req, res, next) => {
})

module.exports = {
    addDiagnosis,
    addPrescription,
    uploadReport,
    getPatientHistory
}