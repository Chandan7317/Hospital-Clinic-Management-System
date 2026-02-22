const { Router } = require("express");
const {
  createDoctor,
  getAllDoctor,
  getDoctorById,
  updateDoctorProfile,
  DeleteDoctor,
} = require("../controllers/doctor.controller");
const {
  isLoggedIn,
  authorizeRoles,
} = require("../middlewares/outh.middleware");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Doctor
 *   description: User Authentication APIs
 */

/**
 * @swagger
 * /api/v1/doctor/createDoctor:
 *   post:
 *     summary: Create Doctor Profile
 *     tags: [Doctor]
 *     description: Create a doctor profile (User role must be DOCTOR)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - specialization
 *               - experience
 *               - consultationFee
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 65abc1234567890abcdef123
 *               specialization:
 *                 type: string
 *                 example: Cardiologist
 *               experience:
 *                 type: number
 *                 example: 5
 *               consultationFee:
 *                 type: number
 *                 example: 500
 *               qualification:
 *                 type: string
 *                 example: MBBS, MD
 *               bio:
 *                 type: string
 *                 example: Experienced heart specialist
 *     responses:
 *       201:
 *         description: Doctor profile created successfully
 *       400:
 *         description: User must have DOCTOR role or profile already exists
 *       500:
 *         description: Internal server error
 */
router.post("/createDoctor", isLoggedIn, authorizeRoles("ADMIN"), createDoctor);
/**
 * @swagger
 * /api/v1/doctor/getAllDoctor:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctor]
 *     responses:
 *       200:
 *         description: Successfully fetched all doctors
 *       500:
 *         description: Server error
 */
router.get("/getAllDoctor", getAllDoctor);
/**
 * @swagger
 * /api/v1/doctor/getSingleDoctor/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags: [Doctor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *           example: 65abc1234567890abcdef123
 *     responses:
 *       200:
 *         description: Doctor fetched successfully
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Server error
 */

router.get("/getSingleDoctor/:id", getDoctorById);
/**
 * @swagger
 * /api/v1/doctor/update/{id}:
 *   put:
 *     summary: Update doctor profile
 *     tags: [Doctor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *           example: 65abc1234567890abcdef123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialization:
 *                 type: string
 *                 example: Cardiologist
 *               experience:
 *                 type: number
 *                 example: 6
 *               consultationFee:
 *                 type: number
 *                 example: 800
 *               qualification:
 *                 type: string
 *                 example: MBBS, MD
 *               bio:
 *                 type: string
 *                 example: Updated doctor bio
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Doctor profile not found
 *       500:
 *         description: Server error
 */

router.put(
  "/update/:id",
  isLoggedIn,
  authorizeRoles("DOCTOR"),
  updateDoctorProfile,
);

/**
 * @swagger
 * /api/v1/doctor/deleteDoctor/{id}:
 *   delete:
 *     summary: Delete doctor profile
 *     tags: [Doctor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *           example: 65abc1234567890abcdef123
 *     responses:
 *       200:
 *         description: Doctor profile deleted successfully
 *       404:
 *         description: Doctor profile not found
 *       500:
 *         description: Server error
 */

router.delete(
  "/deleteDoctor/:id",
  isLoggedIn,
  authorizeRoles("DOCTOR"),
  DeleteDoctor,
);

module.exports = router;
