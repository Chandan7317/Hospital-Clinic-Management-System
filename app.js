require("dotenv").config();
const express = require("express");
const userRouter = require("./src/routes/user.route");
const errorMiddleware = require("./src/middlewares/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const cookieParser = require("cookie-parser");

const app = express();

//& middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//& api routes
app.use("/api/v1/user", userRouter);

//& ─── error middleware ───────────────────────────────────────────────────────────────────
app.use(errorMiddleware);

module.exports = app;
