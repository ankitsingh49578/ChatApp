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
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-10 rounded-full">
              {userDetails?.imageUrl !== "" ? (
                <img src={userDetails?.imageUrl} alt="" />
              ) : (
                <span>{userDetails?.username.slice(0, 2).toUpperCase()}</span>
              )}
          </div>
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
