import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/userThunk";
import toast from "react-hot-toast";
import axios from "axios";

function Signup() {
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    imageUrl: "",
  });

  const dispatch = useDispatch();
  const { buttonLoading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(signupData);
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("password and confirm password do not match!");
    }
    console.log("register");
    const response = await dispatch(registerUserThunk(signupData));
    // console.log(response?.payload?.success);
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  const handleFileUpload = async (e) => {
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
      setSignupData({ ...signupData, imageUrl: res?.data?.url });
    } catch (error) {
      console.log(error);
      console.error("Upload Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 min-h-screen">
      <div className="max-w-[30rem] w-full flex flex-col justify-center items-center gap-5 px-12 py-7 rounded-lg bg-base-200">
        <h2 className="text-4xl font-semibold">Sign Up</h2>
        {/* Full name */}
        <label className="input validator w-full">
          <FaRegUser />
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            value={signupData.fullName}
            required
            placeholder="Full Name"
            // pattern="[A-Za-z][A-Za-z0-9\-]*"
            // minLength="3"
            // maxLength="30"
            // title="Only letters, numbers or dash"
          />
        </label>

        {/* username */}
        <label className="input validator w-full">
          <FaRegUser />
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={signupData.username}
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

        {/* gender */}
        {/* <div className="input validator w-full gap-4">
          <label htmlFor="radio-4" className="flex gap-3 cursor-pointer">
            <input
              id="male"
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
              className="radio radio-primary"
              defaultChecked
            />
            Male
          </label>
          <label htmlFor="radio-4" className="flex gap-4 cursor-pointer">
            <input
              id="female"
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
              className="radio radio-primary"
            />
            Female
          </label>
        </div> */}

        {/* profile photo */}
        <div className="w-full">
          <label className="block text-gray-500 mb-1">
            Upload Profile Photo
          </label>
          <input
            onChange={handleFileUpload}
            type="file"
            className="file-input w-full"
          />
        </div>

        {/* password */}
        <label className="input validator w-full">
          <RiLockPasswordLine />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={signupData.password}
            required
            placeholder="Password"
            // minLength="8"
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <p className="mr-auto hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>

        {/* confirm password */}
        <label className="input validator w-full">
          <RiLockPasswordLine />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={signupData.confirmPassword}
            required
            placeholder="Confirm Password"
            // minLength="8"
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <p className="mr-auto hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>

        {/* button */}
        {buttonLoading ? (
          <button className="w-full btn btn-primary">
            <span className="loading loading-bars loading-xs"></span>
          </button>
        ) : (
          <>
            <button onClick={handleSubmit} className="w-full btn btn-primary">
              Sign Up
            </button>
          </>
        )}

        <p className="text-gray-400 text-sm">
          Already have an account ? &nbsp;
          <Link to="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
