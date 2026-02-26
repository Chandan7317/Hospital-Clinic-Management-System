require("dotenv").config();
const express = require("express");
const errorMiddleware = require("./src/middlewares/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userRouter = require("./src/routes/user.route");
const doctorRoute = require("./src/routes/doctor.route");
const patientRoute=require("./src/routes/patient.routes")


const app = express();

//& middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//& api routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/doctor", doctorRoute);
app.use("/api/v1/patient", patientRoute);

//& ─── error middleware ───────────────────────────────────────────────────────────────────
app.use(errorMiddleware);

module.exports = app;
