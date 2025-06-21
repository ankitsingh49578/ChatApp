import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/userSlice";

const User = ({ userDetails }) => {
  const { selectedUser } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  const isUserOnline = onlineUsers?.includes(userDetails?._id);

  const dispatch = useDispatch();

  const handleUser = () => {
    dispatch(setSelectedUser(userDetails));
  };
  return (
    <div
      onClick={handleUser}
      className={`flex gap-3 items-center p-2 hover:bg-gray-700 cursor-pointer ${
        userDetails?._id === selectedUser?._id && "bg-gray-700"
      }`}
    >
      <div
        className={`avatar avatar-placeholder ${
          isUserOnline ? "avatar-online" : ""
        }`}
      >
        <div className="bg-neutral text-neutral-content w-11 rounded-full">
          <img src={userDetails?.avatar} alt="" />
        </div>
      </div>
      <div className="">
        <h2 className="line-clamp-1">{userDetails?.fullName}</h2>
        <p className="text-xs">{userDetails?.username}</p>
      </div>
    </div>
  );
};

export default User;
