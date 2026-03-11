const asyncHandler = require("express-async-handler");
// & ---------------------------Add Diagnosis------------------------
const addDiagnosis = asyncHandler(async (req, res, next) => {
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