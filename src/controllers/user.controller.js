const fs = require("fs").promises;
const cloudinary = require("cloudinary");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErrorHandler.utils");
const ApiResponse = require("../utils/ApiResponse.utils");
const UserCollection = require("../models/user.model");
// ! cookieOptions
const cookieOptions = {
  secure: process.env.NODE_ENV === "production" ? true : false,
  maxAge: 7 * 24 * 60 * 60 * 1000, //7 day
  httpOnly: true,
};

// & ---------------------register---------------------------

const register = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password) {
    return next(new ErrorHandler("all fields required", 400));
  }

  const userExits = await UserCollection.findOne({ email });
  if (userExits) {
    return next(new ErrorHandler("email is already exits", 409));
    
  }

  const user = await UserCollection.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
    },
  });

  if (!user) {
    return next(
      new ErrorHandler("User registration fieled,please try again later", 400),
    );
  }

  // & TODO: File Upload

  // ^ Run only if user sends a file
  if (req.file) {
    // console.log("image Upload =>",req.file);

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "HMS", //Save file in a folder named lms
        width: 250,
        height: 250,
        gravity: "faces", // This option tells cloudinary to center the image around detected faces (if any )or resizing the original image
        crop: "fill",
      });

      // If success
      if (result) {
        //  Set the  public_id and secure_url in DB
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // After successful upload remove the file from local storage
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(
        new ErrorHandler(error, "File not uploads, please try again", 400),
      );
    }
  }

  await user.save();

  // Generating a JWT token
  const token = await user.generateJWTToken();

  // Setting the password to undefined so it does not get sent in the response
  user.password = undefined;

  // Setting the token in the cookie with name token along with cookieOptions
  res.cookie("token", token, cookieOptions);

  new ApiResponse(200, true, "User registered successfully", user).send(res);
});

// & ---------------------login-----------------------------

const login = asyncHandler(async (req, res, next) => {
  // Destructuring the necessary data from req object
  const { email, password } = req.body;
  // Check if the data is there or not, if not throw error message

  if (!email || !password) {
    return next(new ErrorHandler("Email and Password are required", 400));
  }

  // Finding the user with the sent email
  const user = await UserCollection.findOne({ email }).select("+password");
  // If no user or sent password do not match then send generic response
  if (!(user && (await user.comparePassword(password)))) {
    return next(
      new ErrorHandler(
        "Email or Password do not match or user does not exist",
        400,
      ),
    );
  }

  // Generating a JWT token
  const token = await user.generateJWTToken();

  // Setting the password to undefined so it does not get sent in the response
  user.password = undefined;

  // Setting the token in the cookie with name token along with cookieOptions
  res.cookie("token", token, cookieOptions);

  // If all good send the response to the frontend
  new ApiResponse(200, true, "User logged in successfully", user).send(res);
});

// & ---------------------logout-----------------------------

const logout = asyncHandler(async (req, res, next) => {
   // Setting the cookie value to null
  res.cookie("token", null, {
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: 0,
    httpOnly: true,
  });

  // Sending the response
  new ApiResponse(200, true, "User logged out successfully").send(res);
});

const getProfile = asyncHandler(async (req, res, next) => {
  
});
const forgotPassword = asyncHandler(async (req, res, next) => {});
const updateUser = asyncHandler(async (req, res, next) => {});

module.exports = {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  updateUser,
};
