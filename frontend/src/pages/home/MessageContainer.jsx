import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/messageThunk";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }));
    }
  }, [selectedUser]);

  return (
    <>
      {!selectedUser ? (
        <div className="flex flex-col items-center justify-center mx-auto select-none">
          <h2 className="text-4xl text-blue-700">Welcome to Lets Chat</h2>
          <p className="mt-2 text-xl text-blue-700">
            Please select a user to continue...
          </p>
        </div>
      ) : (
        <div className="flex flex-col h-screen w-full">
          {/* user */}
          <div className="p-2 border-b border-b-white/10 rounded-b-md">
            {/* <User userDetails={selectedUser} /> */}
            <div className="flex gap-3 items-center p-2">
              <div className="avatar avatar-placeholder">
                <div className="avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content w-10 rounded-full">
                    {selectedUser?.imageUrl !== "" ? (
                      <img src={selectedUser?.imageUrl} alt="" />
                    ) : (
                      <span>
                        {selectedUser?.username.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="">
                <h2 className="line-clamp-1">{selectedUser?.fullName}</h2>
                <p className="text-xs">{selectedUser?.username}</p>
              </div>
            </div>
          </div>

          {/* messages */}
          <div className="p-3 h-full overflow-y-auto">
            {messages?.map((messageDetails) => {
              return (
                <Message
                  key={messageDetails._id}
                  messageDetails={messageDetails}
                />
              );
            })}
          </div>
          <SendMessage />
        </div>
      )}
    </>
  );
};

export default MessageContainer;
