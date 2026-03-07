const { Router } = require("express");
const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  getAllAppointments,
  deleteAppointment,
} = require("../controllers/appointment.controller");
const {
  isLoggedIn,
  authorizeRoles,
} = require("../middlewares/outh.middleware");

const router = Router();

// Patient routes
/**
 * @swagger
 * /api/v1/appointment/bookApointment:
 *   post:
 *     summary: Book a new appointment
 *     description: Patient can book an appointment with an available doctor.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *               - appointmentDate
 *               - timeSlot
 *             properties:
 *               doctorId:
 *                 type: string
 *                 example: "65f1c1b5d5a8b123456789ab"
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-03-10"
 *               timeSlot:
 *                 type: string
 *                 example: "10:00 AM - 10:30 AM"
 *               reason:
 *                 type: string
 *                 example: "Fever and headache"
 *     responses:
 *       200:
 *         description: Appointment booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Appointment booked successfully
 *       400:
 *         description: Bad request or slot already booked
 *       404:
 *         description: Patient profile or Doctor not found
 *       401:
 *         description: Unauthorized
 */

router.post(
  "/bookApointment",
  isLoggedIn,
  authorizeRoles("PATIENT"),
  bookAppointment,
);

/**
 * @swagger
 * /api/v1/appointment/myAppointment:
 *   get:
 *     summary: Get logged-in patient's appointments
 *     description: Returns all appointments booked by the logged-in patient.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 2
 *                 appointments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "65f3e2c1a5a8b123456789ab"
 *                       appointmentDate:
 *                         type: string
 *                         format: date
 *                         example: "2026-03-10"
 *                       timeSlot:
 *                         type: string
 *                         example: "10:00 AM - 10:30 AM"
 *                       status:
 *                         type: string
 *                         example: "PENDING"
 *                       reason:
 *                         type: string
 *                         example: "Fever"
 *                       doctor:
 *                         type: object
 *                         properties:
 *                           specialization:
 *                             type: string
 *                             example: "Cardiologist"
 *                           consultationFee:
 *                             type: number
 *                             example: 500
 *                           experience:
 *                             type: number
 *                             example: 8
 *                           qualification:
 *                             type: string
 *                             example: "MBBS, MD"
 *                           isAvailable:
 *                             type: boolean
 *                             example: true
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Patient not found
 */
router.get(
  "/myAppointment",
  isLoggedIn,
  authorizeRoles("PATIENT"),
  getMyAppointments,
);

// Doctor routes
/**
 * @swagger
 * /api/v1/appointment/viewdoctorAppointment:
 *   get:
 *     summary: Get doctor's appointments
 *     description: Logged-in doctor can view all appointments assigned to them.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Doctor appointments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 3
 *                 message:
 *                   type: string
 *                   example: Doctor View Appointments Successfully
 *                 appointments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "65f3e2c1a5a8b123456789ab"
 *                       appointmentDate:
 *                         type: string
 *                         format: date
 *                         example: "2026-03-10"
 *                       timeSlot:
 *                         type: string
 *                         example: "10:00 AM - 10:30 AM"
 *                       status:
 *                         type: string
 *                         example: "PENDING"
 *                       patient:
 *                         type: object
 *                         properties:
 *                           age:
 *                             type: number
 *                             example: 28
 *                           gender:
 *                             type: string
 *                             example: "Male"
 *                           bloodGroup:
 *                             type: string
 *                             example: "O+"
 *                       doctor:
 *                         type: object
 *                         properties:
 *                           specialization:
 *                             type: string
 *                             example: "Cardiologist"
 *                           experience:
 *                             type: number
 *                             example: 10
 *                           consultationFee:
 *                             type: number
 *                             example: 700
 *                           qualification:
 *                             type: string
 *                             example: "MBBS, MD"
 *                           bio:
 *                             type: string
 *                             example: "Experienced heart specialist"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (Only doctor can access)
 *       404:
 *         description: Doctor not found
 */
router.get(
  "/viewdoctorAppointment",
  isLoggedIn,
  authorizeRoles("DOCTOR"),
  getDoctorAppointments,
);

/**
 * @swagger
 * /api/v1/appointment/doctor/update/Appointment/status/{id}:
 *   put:
 *     summary: Update appointment status
 *     description: Doctor can update appointment status (APPROVED, REJECTED, COMPLETED).
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *           example: "65f3e2c1a5a8b123456789ab"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [APPROVED, REJECTED, COMPLETED]
 *                 example: APPROVED
 *     responses:
 *       200:
 *         description: Appointment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Appointment status updated
 *                 appointment:
 *                   type: object
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only doctor can update appointment
 *       404:
 *         description: Appointment not found
 */
router.put(
  "/doctor/update/Appointment/status/:id",
  isLoggedIn,
  authorizeRoles("DOCTOR"),
  updateAppointmentStatus,
);

// Common delete
/**
 * @swagger
 * /api/v1/appointment/deleteAppointment/{id}:
 *   delete:
 *     summary: Soft delete an appointment
 *     description: Marks an appointment as deleted instead of permanently removing it from the database.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *           example: "65f3e2c1a5a8b123456789ab"
 *     responses:
 *       200:
 *         description: Appointment soft deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Appointment deleted (Soft)
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Appointment not found
 */
router.delete("/deleteAppointment/:id", isLoggedIn, deleteAppointment);

// Admin routes
/**
 * @swagger
 * /api/v1/appointment/admin/all/Appointments:
 *   get:
 *     summary: Get all appointments (Admin)
 *     description: Admin can view all appointments in the system including doctor and patient details.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All appointments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 10
 *                 appointments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "65f3e2c1a5a8b123456789ab"
 *                       appointmentDate:
 *                         type: string
 *                         format: date
 *                         example: "2026-03-10"
 *                       timeSlot:
 *                         type: string
 *                         example: "10:00 AM - 10:30 AM"
 *                       status:
 *                         type: string
 *                         example: "PENDING"
 *                       doctor:
 *                         type: object
 *                         description: Doctor details
 *                       patient:
 *                         type: object
 *                         description: Patient details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (Admin only)
 */
router.get(
  "/admin/all/Appointments",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  getAllAppointments,
);
module.exports = router;
