import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { sendMessageThunk } from "../../store/slice/message/messageThunk";
import { useDispatch, useSelector } from "react-redux";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if(!message)return;
    const res = await dispatch(sendMessageThunk({receiverId: selectedUser?._id, message}));
    if(res?.payload?.success){
        setMessage("");
    }
  };
  return (
    <>
      {/* input */}
      <div className="p-3 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message..."
          className="input w-full"
        />
        <button
          onClick={handleSubmit}
          className="btn btn-square btn-outline btn-primary"
        >
          <IoMdSend />
        </button>
      </div>
    </>
  );
};

export default SendMessage;
