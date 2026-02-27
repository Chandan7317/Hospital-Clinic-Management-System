const { Router } = require("express");
const { isLoggedIn, authorizeRoles } = require("../middlewares/outh.middleware");
const { createPatientProfile } = require("../controllers/patient.controller");

const router= Router();


// Patient self routes
/**
 * @swagger
 * /api/v1/patient/create:
 *   post:
 *     summary: Create patient profile
 *     tags: [Patient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - age
 *               - gender
 *               - bloodGroup
 *               - phone
 *               - address
 *             properties:
 *               age:
 *                 type: number
 *                 example: 25
 *               gender:
 *                 type: string
 *                 example: Male
 *               bloodGroup:
 *                 type: string
 *                 example: O+
 *               phone:
 *                 type: string
 *                 example: 9876543210
 *               address:
 *                 type: string
 *                 example: Ghaziabad, Uttar Pradesh
 *               medicalHistory:
 *                 type: string
 *                 example: No major illnesses
 *     responses:
 *       200:
 *         description: Patient profile created successfully
 *       400:
 *         description: Validation error or profile already exists
 *       500:
 *         description: Server error
 */
router.post(
  "/create",
  isLoggedIn,
  authorizeRoles("PATIENT"),
  createPatientProfile
);


module.exports = router;
