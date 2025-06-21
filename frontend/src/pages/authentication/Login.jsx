import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserThunk } from "../../store/slice/user/userThunk.js";

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { buttonLoading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated){
      navigate("/");
    }
  }, [isAuthenticated])
  

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async () => {
    console.log("login");
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 min-h-screen">
      <div className="max-w-[30rem] w-full flex flex-col justify-center items-center gap-5 p-12 rounded-lg bg-base-200">
        <h2 className="text-4xl font-semibold">Login</h2>
        {/* username */}
        <label className="input validator w-full">
          <FaRegUser />
          <input
            name="username"
            onChange={handleChange}
            value={loginData.username}
            type="text"
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

        {/* email */}
        {/* <label className="input validator w-full">
          <MdOutlineEmail />
          <input
            name="email"
            onChange={handleChange}
            // value={loginData.email}
            type="email"
            placeholder="mail@gmail.com"
            required
          />
        </label>
        <div className="mr-auto validator-hint hidden">
          Enter valid email address
        </div> */}

        {/* password */}
        <label className="input validator w-full">
          <RiLockPasswordLine />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={loginData.password}
            required
            placeholder="Password"
            // minLength="8"
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            // title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        {/* <p className="mr-auto validator hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p> */}
        {/* button */}
        {buttonLoading ? (
          <button className="w-full btn btn-primary">Logging in...</button>
        ) : (
          <>
            <button onClick={handleLogin} className="w-full btn btn-primary">
              Login
            </button>
          </>
        )}

        <p className="text-gray-400 text-sm">
          Don't have an account ? &nbsp;
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
