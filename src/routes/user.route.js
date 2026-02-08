const { Router } = require("express");
const { register } = require("../controllers/user.controller");
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

module.exports = router;
