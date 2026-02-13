const { Router } = require("express");
const {
  createDoctor,
  getAllDoctor,
} = require("../controllers/doctor.controller");

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
router.post("/createDoctor", createDoctor);
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

module.exports = router;
