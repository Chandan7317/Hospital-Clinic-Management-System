const { Router } = require("express");
const { register, login } = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware");

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

module.exports = router;
