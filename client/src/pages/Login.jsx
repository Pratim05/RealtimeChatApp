import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {ToastContainer , toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { loginRoute } from '../utils/APIRoutes'
import app_logo from "../assets/app_logo.png"
import { FaUser } from "react-icons/fa";
import { IoLockClosedSharp,IoLockOpenSharp } from "react-icons/io5";


import "./CssFiles/Login.css"

export const Login = () => {
  const navigate = useNavigate()
 
  const [UserData, setUserData] = useState({
    username :"",
    password: "",  
  })

  const toastOptions = {
      position:'bottom-right',
      autoClose:7000,
      draggable:true,
      pauseOnHover:true,
      theme:"colored"
  }

useEffect(()=>{
  if(localStorage.getItem("chat-app-user")){
    navigate("/chatroom")
  }
})

const handleSubmit = async (event)=>{
  event.preventDefault()
  if(handeValidation()){
    // console.log("in Validation", loginRoute);
    const {password,username} = UserData
    const response = await axios.post(loginRoute,{
      username,password
    })
     //console.log(response.data.status, response.data.msg)
if(response.data.status===false){
  toast.error(response.data.msg ,toastOptions)
}
if(response.data.status === true){
  toast.success(response.data.msg ,toastOptions)
 console.log(response.data.msg);
  localStorage.setItem("chat-app-user",JSON.stringify(response.data.user))
  navigate("/chatroom")
}
  }
 
}
const handeValidation = ()=>{
  const {username,password} = UserData

  if(password === ""){
    toast.error("Password is Required",toastOptions)
    return false
  }
  else if(username===""){
    toast.error("Username is required",toastOptions)
    return false
  }
  
  return true
}

const handleChange = (e)=>{

  setUserData({...UserData,[e.target.name]: e.target.value})
  
}

const [visible, setVisible] = useState("password")
const visiblePasword = ()=>{
  if(visible === "password"){
  setVisible("text")
}
  if(visible === "text"){
  setVisible("password")
}

}


  return (

    <div className='Login'>

       <div className="brand">
        <img src={app_logo} alt="SwiftTalk" height={70} />
        
       </div>

       <form onSubmit={(event)=>{handleSubmit(event)}}>
<div className="input-boxes">
  <div className="input-box"> 
  <div className="icon"><FaUser /></div>
  <input type='text' placeholder='Username' name='username' onChange={(e)=>{handleChange(e)}}/>
  </div>

  <div className="input-box"> 
  <div className="icon" onClick={()=>{visiblePasword()}}>
        {visible === "password" ? (
          <IoLockClosedSharp />
        ) : (
          <IoLockOpenSharp />
        )}
      </div>  <input type={visible} placeholder='Password' name='password' onChange={(e)=>{handleChange(e)}}/>
  </div>


</div>
<div className="mid-line">
<button className='form-btn' type='submit'>Log in</button>
<p className="forget-pass">Forgot Password ?</p>
</div>
      
       <span>
        <p>Don't Have An Account ?</p>
       
       </span>

       </form>
       <Link className='option-btn' to="/register">Create an Account</Link>
       <ToastContainer/>
    </div>
    
  )
}
