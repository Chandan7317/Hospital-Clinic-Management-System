const { Router } = require("express");
const { register } = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware");

const router = Router();

router.post("/register", upload.single("avatar"), register);

module.exports = router;
