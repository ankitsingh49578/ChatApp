import React, { useEffect, useState } from "react";
import { CiGlass, CiSearch } from "react-icons/ci";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  logoutUserThunk,
} from "../../store/slice/user/userThunk";
import { useNavigate } from "react-router-dom";

const UserSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState();

  const { userProfile, buttonLoading, otherUsers } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log("logout");
    const response = await dispatch(logoutUserThunk());
    if (response?.payload?.success) {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers.filter(
          (user) =>
            user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.fullName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue, otherUsers]);

  useEffect(() => {
    (async () => {
      dispatch(getOtherUsersThunk());
    })();
  }, []);

  return (
    <div className="max-w-[20rem] w-full h-screen flex flex-col border-r border-r-white/10">
      {/* logo */}

      <h1 className="bg-black mx-auto mt-3 px-2 py-1 text-[#5754E8] font-semibold text-xl rounded-lg">
        LETS CHAT
      </h1>

      {/* search input */}
      <div className="p-2">
        <label className="input">
          <CiSearch />
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            required
            placeholder="Search"
          />
        </label>
      </div>

      {/* Chats */}
      <div className="h-full overflow-y-scroll px-3 flex flex-col gap-2 select-none">
        {users?.map((userDetails) => {
          return <User key={userDetails._id} userDetails={userDetails} />;
        })}
      </div>

      {/* footer */}
      <div className="h-[3rem] flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className="avatar avatar-online avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-10 rounded-full">
              {/* <span className="text-xl">AI</span> */}
              <img src={userProfile?.avatar} alt="" />
            </div>
          </div>
          <p className="text-md">{userProfile?.username}</p>
        </div>

        {buttonLoading ? (
          <button className="btn btn-primary btn-sm px-4">
            Logging out...
          </button>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="btn btn-primary btn-sm px-4"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserSidebar;
