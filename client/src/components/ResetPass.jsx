import React, { useState } from 'react'
import { IoLockClosedSharp, IoLockOpenSharp } from "react-icons/io5";
import {Link, useNavigate,useParams} from "react-router-dom"
import {ToastContainer , toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import app_logo from "../assets/app_logo.png"
import { resetpassroute } from '../utils/APIRoutes';
import axios from 'axios';

function ResetPass() {
    const navigate = useNavigate()

    const [newPassword, setNewPassword] = useState("")
    const [newConfirmPassword, setNewConfirmPassword] = useState("")
    const {id ,token} = useParams()
    
  const toastOptions = {
    position:'bottom-right',
    autoClose:7000,
    draggable:true,
    pauseOnHover:true,
   
}


    const [visible, setVisible] = useState("password");
    const visiblePasword = () => {
      if (visible === "password") {
        setVisible("text");
      }
      if (visible === "text") {
        setVisible("password");
      }
    };

    const handeValidation = ()=>{
        if(newPassword !== newConfirmPassword){
          toast.error("Password and Confirm Password should be same",toastOptions)
          return false
        }
        else if(newPassword.length<6){
          toast.error("Password length should be greater than 6",toastOptions)
          return false
        }
        return true
      }

    const handleSubmit =async (event)=>{
        try {
            event.preventDefault()
            if(handeValidation()){
                const response = await axios.post(`${resetpassroute}/${id}/${token}`,{
                    newPassword
                  })
                  // console.log(response)
                  if(response.data.status===false){
                    toast.error(response.data.msg ,toastOptions)
                  }
                  if(response.data.status===true){
                    toast.success(response.data.msg ,toastOptions)
                    navigate("/login")
                  }

            }
        } catch (error) {
            console.log(error)
        }
    }
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
              setNewPassword(e.target.value);
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
            placeholder="Confirm Password"
            name="confirmpassword"
            onChange={(e) => {
              setNewConfirmPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="mid-line">
          <button className="form-btn" type="submit">
            Reset Password
          </button>
        </div>
    </form>
    <Link className="option-btn" to="/">
     Go Back
    </Link>
    
  </div>
  )
}

export default ResetPass