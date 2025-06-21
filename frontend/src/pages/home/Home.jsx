import React from "react";
import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeSocket,
  setOnlineUsers,
} from "../../store/slice/socket/socketSlice";
import { setNewMessage } from "../../store/slice/message/messageSlice";

function Home() {
  const { isAuthenticated, userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { socket, onlineUsers } = useSelector((state) => state.socketReducer);

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("newMessage", (message) => {
      dispatch(setNewMessage(message));
    });
    return () => {
      socket.close();
    };
  }, [socket]);
  return (
    <div className="flex overflow-hidden">
      <UserSidebar />
      <MessageContainer />
    </div>
  );
}

export default Home;
