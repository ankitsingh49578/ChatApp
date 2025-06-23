import React, { useEffect, useState } from "react";
import {
  editUserProfileThunk,
  logoutUserThunk,
} from "../../store/slice/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import { CiImageOn } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";

const EditProfile = ({ buttonLoading }) => {
  const { userProfile, saveButtonLoading } = useSelector((state) => state.user);
  const [updateData, setUpdateData] = useState({
    fullName: "",
    username: "",
    imageUrl: "",
  });
  // console.log(updateData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("logout");
    const response = await dispatch(logoutUserThunk());
    if (response?.payload?.success) {
      navigate("/login");
    }
  };

  useEffect(() => {
    setUpdateData({
      fullName: userProfile?.fullName ?? "",
      username: userProfile?.username ?? "",
      imageUrl: userProfile?.imageUrl ?? "",
    });
  }, [userProfile, editUserProfileThunk]);

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const [imageLoading, setImageLoading] = useState(false);
  const [preview, setPreview] = useState(true);
  const handleFileUpload = async (e) => {
    setPreview(false);
    setImageLoading(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET_NAME);
    // data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    // upload image to cloudinary
    try {
      const res = await axios.post(
        import.meta.env.VITE_CLOUDINARY_BASE_URL,
        data
      );
      setUpdateData({ ...updateData, imageUrl: res?.data?.url });
      setImageLoading(false);
    } catch (error) {
      console.log(error);
      console.error("Upload Error:", error.response?.data || error.message);
    }
  };

  const handleSave = async () => {
    const res = await dispatch(editUserProfileThunk(updateData));
    console.log("editProfile", res);
  };
  return (
    <div>
      <input type="checkbox" id="edit-profile" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box px-14 py-8">
          <h3 className="font-bold mb-5 text-lg">Edit Profile</h3>

          {/* full name */}
          <div className="form-control mb-3 flex flex-col gap-2 w-full">
            <label className="input w-full">
              <FaRegUser />
              <input
                type="text"
                name="fullName"
                value={updateData.fullName}
                onChange={handleChange}
                required
                placeholder="Full Name"
              />
            </label>
          </div>

          {/* username */}
          <div className="form-control mb-3 flex flex-col gap-2 w-full">
            <label className="input validator w-full">
              <FaRegUser />
              <input
                type="text"
                name="username"
                value={updateData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="30"
                title="Only letters, numbers or dash"
              />
            </label>
            <p className="mr-auto -mt-2 validator-hint hidden">
              Must be 3 to 30 characters
              <br />
              containing only letters, numbers or dash
            </p>
          </div>

          {/* profile photo */}
          <label className="block text-gray-500 mb-1">
            Upload Profile Photo
          </label>
          {/* <div className="flex flex-col"> */}
          <div className="form-control mb-2 flex flex-col gap-2 w-full">
            <div className="w-full">
              <input
                onChange={handleFileUpload}
                type="file"
                className="file-input w-full"
              />
            </div>
          </div>
          {updateData.imageUrl ? (
            <img
              src={updateData.imageUrl}
              alt="Profile preview"
              className="w-12 h-10 rounded-md mb-2"
            />
          ) : preview ? (
            <span className="flex gap-2 items-center">
              <CiImageOn size={40} />
              Image preview
            </span>
          ) : (
            <span className="loading loading-bars loading-xl"></span>
          )}
          {/* </div> */}

          {/* save and logout button */}
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className="bg-[#5754E8] text-[13px] rounded px-6 py-1.5 modal-action my-auto hover:scale-105 transition-all ease-in-out duration-200 cursor-pointer"
            >
              <label htmlFor="edit-profile" className="cursor-pointer">
                {saveButtonLoading ? (
                  <span className="loading loading-bars loading-xs text-[13px]"></span>
                ) : (
                  "Save"
                )}
              </label>
            </button>
            <div className="modal-action">
              <button
                onClick={handleLogout}
                className="bg-[#9E4042] rounded hover:scale-105 my-auto flex py-1.5 px-4 transition-all ease-in-out duration-200 cursor-pointer"
              >
                {buttonLoading ? (
                  <span className="loading loading-bars loading-xs text-[13px]"></span>
                ) : (
                  <span className="text-[13px] cursor-pointer">Logout</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Trigger Button --> */}
      <label htmlFor="edit-profile" className="mr-2 cursor-pointer flex">
        <IoSettingsOutline
          size={20}
          className="hover:scale-120 transition-all"
        />
      </label>
    </div>
  );
};

export default EditProfile;
