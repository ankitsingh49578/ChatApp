import {app, server} from "./socket/socket.js";
import express from "express";
import connectDB from "./db/connection1.db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

connectDB()
  .catch((err) => console.log(err))
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.use(
  cors({
    origin: "https://lets-chat-pied.vercel.app",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies
const PORT = process.env.PORT || 5000;

// routes
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Error handling middleware
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
