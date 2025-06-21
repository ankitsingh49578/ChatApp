import User from "../models/user.model.js";
import asyncHandler from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register route
const register = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, gender } = req.body;
  if (!fullName || !username || !password || !gender) {
    return next(new errorHandler("Please fill all the fields", 400));
  }
  const user = await User.findOne({ username });
  if (user) {
    return next(new errorHandler("User already exists", 400));
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarType = gender === "male" ? "boy" : "girl";
  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;
  const newUser = await User.create({
    fullName,
    username,
    password: hashedPassword,
    gender,
    avatar,
  });

  const tokenData = {
    _id: newUser?.id,
  };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "2d",
  });
  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message: "User registered successfully",
      responseData: {
        newUser,
        token,
      },
    });
});

// Login route
const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(
      new errorHandler("Please enter a valid username or password", 400)
    );
  }
  const user = await User.findOne({ username });
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }
  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(
      new errorHandler("Please enter a valid username or password", 400)
    );
  }
  const tokenData = {
    _id: user?.id,
  };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "2d",
  });
  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true, // Use secure cookies in production
      sameSite: "None",
    })
    .json({
      success: true,
      message: "Login successful",
      responseData: {
        user,
        token,
      },
    });
});

// Get user profile
const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id; // Assuming user ID is set in req.user by auth middleware
  if (!userId) {
    return next(new errorHandler("User not authenticated", 401));
  }
  const profile = await User.findById(userId);
  if (!profile) {
    return next(new errorHandler("User profile not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    responseData: {
      profile,
    },
  });
});

// Logout route
const logout = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout successful",
      // responseData: ,
    });
});

// get other users
const getOtherUsers = asyncHandler(async (req, res, next) => {
  const otherUsers = await User.find({ _id: { $ne: req.user._id } });
  res.status(200).json({
    success: true,
    message: "Other users fetched successfully",
    responseData: {
      otherUsers,
    },
  });
});

export { login, register, getProfile, logout, getOtherUsers };
