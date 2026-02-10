const { Router } = require("express");
const {
  register,
  login,
  logout,
  getProfile,
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
module.exports = router;
