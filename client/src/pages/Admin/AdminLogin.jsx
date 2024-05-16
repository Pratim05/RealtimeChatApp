import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import app_logo from "../../assets/app_logo.png";
import { FaUser } from "react-icons/fa";
import { IoLockClosedSharp, IoLockOpenSharp } from "react-icons/io5";
import { adminloginRoute } from "../../utils/APIRoutes";

function AdminLogin() {
    const navigate = useNavigate();
  const [OpenModal, setOpenModal] = useState(false)
  const [email, setEmail] = useState()
  const [UserData, setUserData] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 7000,
    draggable: true,
    pauseOnHover: true,
    theme: "colored",
  };

  const handeValidation = () => {
    const {email, password } = UserData
    if (password === "") {
      toast.error("Password is Required", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };


  
  const handleChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };
  const [visible, setVisible] = useState("password");
  const visiblePasword = () => {
    if (visible === "password") {
      setVisible("text");
    }
    if (visible === "text") {
      setVisible("password");
    }
  };


  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (handeValidation()) {

        const { password, email } = UserData;
        const response = await axios.post(adminloginRoute, {
          email,
          password,
        });
        if (response.data.status === false) {
          toast.error(response.data.msg, toastOptions);
        }
        if (response.data.status === true) {
          toast.success(response.data.msg, toastOptions);
          console.log(response.data.msg);
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login">
      <div className="brand">
        <img src={app_logo} alt="SwiftTalk" height={70} />
      </div>
     

      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="input-boxes">
          <div className="input-box">
            <div className="icon">
              <FaUser />
            </div>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>

          <div className="input-box">
            <div
              className="icon"
              onClick={() => {
                visiblePasword();
              }}
            >
              {visible === "password" ? (
                <IoLockClosedSharp />
              ) : (
                <IoLockOpenSharp />
              )}
            </div>{" "}
            <input
              type={visible}
              placeholder="Password"
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
        <div className="mid-line">
          <button className="form-btn" type="submit">
            Log in
          </button>

        </div>

    
      </form>
     
      
    </div>
  );
};
export default AdminLogin