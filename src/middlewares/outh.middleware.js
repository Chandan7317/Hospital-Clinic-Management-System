const ErrorHandler = require("../utils/ErrorHandler.utils");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// !  isLoggedIn
const isLoggedIn = async (req, _res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler("Unauthorized, please login to continue", 400),
    );
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = userDetails;

  next();
};

//! Middleware to check if user is admin or not

const authorizeRoles = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler("You do not have permission to view this route", 400)
      );
    }
    next();
  });

module.exports = {
  isLoggedIn,
  authorizeRoles,
};
