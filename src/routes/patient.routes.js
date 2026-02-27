const { Router } = require("express");
const {
  isLoggedIn,
  authorizeRoles,
} = require("../middlewares/outh.middleware");
const {
  createPatientProfile,
  getMyProfile,
  updatePatientProfile,
  deletePatientProfile,
  getAllPatients,
} = require("../controllers/patient.controller");

const router = Router();

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
  createPatientProfile,
);

/**
 * @swagger
 * /api/v1/patient/me:
 *   get:
 *     summary: Get logged-in patient profile
 *     tags: [Patient]
 *     responses:
 *       200:
 *         description: Patient profile fetched successfully
 *       404:
 *         description: Patient profile not found
 *       500:
 *         description: Server error
 */
router.get("/me", isLoggedIn, authorizeRoles("PATIENT"), getMyProfile);

/**
 * @swagger
 * /api/v1/patient/update:
 *   put:
 *     summary: Update logged-in patient profile
 *     tags: [Patient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age:
 *                 type: number
 *                 example: 30
 *               gender:
 *                 type: string
 *                 example: Male
 *               bloodGroup:
 *                 type: string
 *                 example: A+
 *               phone:
 *                 type: string
 *                 example: 9876543210
 *               address:
 *                 type: string
 *                 example: Delhi, India
 *               medicalHistory:
 *                 type: string
 *                 example: Diabetes since 2020
 *     responses:
 *       200:
 *         description: Patient profile updated successfully
 *       404:
 *         description: Patient profile not found
 *       500:
 *         description: Server error
 */
router.put(
  "/update",
  isLoggedIn,
  authorizeRoles("PATIENT"),
  updatePatientProfile,
);

/**
 * @swagger
 * /api/v1/patient/delete:
 *   delete:
 *     summary: Soft delete logged-in patient profile
 *     tags: [Patient]
 *     responses:
 *       200:
 *         description: Patient profile deleted (Soft Delete)
 *       404:
 *         description: Patient profile not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/delete",
  isLoggedIn,
  authorizeRoles("PATIENT"),
  deletePatientProfile,
);

// Admin routes

/**
 * @swagger
 * /api/v1/patient/admin/all:
 *   get:
 *     summary: Get all patients (Admin only)
 *     tags: [Patient]
 *     responses:
 *       200:
 *         description: Fetch all patients successfully
 *       500:
 *         description: Server error
 */
router.get("/admin/all", isLoggedIn, authorizeRoles("ADMIN"), getAllPatients);
module.exports = router;
