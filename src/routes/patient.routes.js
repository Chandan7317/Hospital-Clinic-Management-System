const { Router } = require("express");
const { isLoggedIn, authorizeRoles } = require("../middlewares/outh.middleware");
const { createPatientProfile } = require("../controllers/patient.controller");

const router= Router();


// Patient self routes
router.post(
  "/create",
  isLoggedIn,
  authorizeRoles("PATIENT"),
  createPatientProfile
);


module.exports = router;
