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

  const isSender = userProfile?._id === messageDetails?.senderId;
  const sender = isSender ? userProfile : selectedUser;

  const messageAvatar =
    sender?.imageUrl === ""
      ? sender?.username?.slice(0, 2).toUpperCase()
      : sender?.imageUrl;

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
        <div className="chat-image avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-10 rounded-full">
            {messageAvatar.length === 2 ? (
              <span className="text-center">{messageAvatar}</span>
            ) : (
              <img src={messageAvatar} alt="" />
            )}
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
