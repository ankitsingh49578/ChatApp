import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import asyncHandler from "../utilities/asyncHandler.utility.js";
import { getSocketId, io } from "../socket/socket.js";

// message sent
const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;
  const message = req.body.message;
  if (!message || !senderId || !receiverId) {
    return next(
      new errorHandler(400, "Message, senderId and receiverId are required")
    );
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }
  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });
  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }
  // socket.io implementation can be added here
  const socketId = getSocketId(receiverId);
  io.to(socketId).emit("newMessage", newMessage);

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    responseData: newMessage,
  });
});

// message receive
const getMessages = asyncHandler(async (req, res, next) => {
  const myId = req.user._id;
  const otherParticipantId = req.params.otherParticipantId;

  if (!myId || !otherParticipantId) {
    return next(
      new errorHandler(400, "myId and otherParticipantId are required")
    );
  }
  let conversation = await Conversation.findOne({
    participants: { $all: [myId, otherParticipantId] },
  }).populate("messages");

  res.status(200).json({
    success: true,
    message: "Messages retrieved successfully",
    responseData: conversation,
  });
});

export { sendMessage, getMessages };
