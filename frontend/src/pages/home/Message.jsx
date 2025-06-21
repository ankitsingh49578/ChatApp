import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ messageDetails }) => {
  const { userProfile, selectedUser } = useSelector((state) => state.user);
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageDetails]);
  return (
    <div>
      <div
        ref={messageRef}
        className={`chat ${
          userProfile?._id === messageDetails?.senderId
            ? "chat-end"
            : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="avatar"
              src={
                userProfile?._id === messageDetails?.senderId
                  ? userProfile?.avatar
                  : selectedUser?.avatar
              }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">{}</time>
        </div>
        <div className="chat-bubble">{messageDetails?.message}</div>
        {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
      </div>
    </div>
  );
};

export default Message;
