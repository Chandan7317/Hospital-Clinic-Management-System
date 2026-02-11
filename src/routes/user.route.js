const { Router } = require("express");
const {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
} = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware");
const { isLoggedIn } = require("../middlewares/outh.middleware");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Authentication APIs
 */

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register new user with avatar upload
 *     tags: [User]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Chandan
 *               email:
 *                 type: string
 *                 example: chandan@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User registered successfully
 */

router.post("/register", upload.single("avatar"), register);
/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login user and generate JWT token
 *     tags: [User]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: chandan@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);
/**
 * @swagger
 * /api/v1/user/logout:
 *   post:
 *     summary: Logout user
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 */

router.post("/logout", logout);

/**
 * @swagger
 * /api/v1/user/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User details
 */

router.get("/me", isLoggedIn, getProfile);
/**
 * @swagger
 * /api/v1/user/reset:
 *   post:
 *     summary: Send password reset email
 *     tags: [User]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Reset password email sent successfully
 *       400:
 *         description: Email is required
 *       404:
 *         description: Email not registered
 *       500:
 *         description: Internal server error
 */

router.post("/reset", forgotPassword);
/**
 * @swagger
 * /api/v1/user/reset/{resetToken}:
 *   post:
 *     summary: Reset user password using reset token
 *     tags: [User]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: resetToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token sent to user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Password is required or token is invalid/expired
 *       500:
 *         description: Internal server error
 */

router.post("/reset/:resetToken", resetPassword);
/**
 * @swagger
 * /api/v1/user/change-password:
 *   post:
 *     summary: Change password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid input
 */

router.post("/change-password", isLoggedIn, changePassword);
/**
 * @swagger
 * /api/v1/user/update/{id}:
 *   put:
 *     summary: Update user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User details updated successfully
 *       400:
 *         description: Invalid user id or file upload error
 *       401:
 *         description: Unauthorized
 */
router.put("/update/:id", isLoggedIn, upload.single("avatar"), updateUser);

module.exports = router;
