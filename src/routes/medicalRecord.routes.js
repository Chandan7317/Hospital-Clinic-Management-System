const express = require("express");
const { isLoggedIn, authorizeRoles } = require("../middlewares/auth.middleware");
const { addDiagnosis, addPrescription, uploadReport, getPatientHistory } = require("../controllers/medicalRecord.controller");


const router = express.Router();


// Doctor adds diagnosis
router.post(
  "/diagnosis",
  isLoggedIn,
  authorizeRoles("DOCTOR"),
  addDiagnosis
);


// Doctor adds prescription
router.post(
  "/prescription/:id",
  isLoggedIn,
  authorizeRoles("DOCTOR"),
  addPrescription
);


// Doctor uploads reports
router.post(
  "/report/:id",
  isLoggedIn,
  authorizeRoles("DOCTOR"),
  uploadReport
);


// Patient views history
router.get(
  "/history",
  isLoggedIn,
  authorizeRoles("PATIENT"),
  getPatientHistory
);

module.exports = router;