import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });

const userSocketMap = {
  // userId: socketId,
};
io.on("connection", (socket) => {
  // console.log(socket.id);
  const userId = socket.handshake.query.userId;
  if (!userId) return;
  userSocketMap[userId] = socket.id;

  // console.log(Object.keys(userSocketMap));
  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

const getSocketId = (userId) => {
  return userSocketMap[userId];
};

export { io, app, server, getSocketId };
