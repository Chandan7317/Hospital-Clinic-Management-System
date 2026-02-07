require("dotenv").config();
const express = require("express");
const userRouter = require("./src/routes/user.route");
const errorMiddleware = require("../LMS backend and Frontend Project/backend/src/middleware/error.middleware");
const app = express();

//& middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

//& api routes
app.use("/api/v1/user", userRouter);

//& ─── error middleware ───────────────────────────────────────────────────────────────────
app.use(errorMiddleware);

module.exports = app;
