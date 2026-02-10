const ErrorHandler = require("../utils/ErrorHandler.utils");
const jwt = require("jsonwebtoken");

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

module.exports = {
  isLoggedIn,
};
