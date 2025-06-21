import jwt from "jsonwebtoken";
import asyncHandler from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    return next(new errorHandler("No token provided", 401));
  }
  const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  if(!tokenData) {
    return next(new errorHandler("Invalid token", 401));
  }
  req.user = tokenData;
  next();
});

export { isAuthenticated };
