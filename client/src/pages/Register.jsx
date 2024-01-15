import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {ToastContainer , toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { registerRoute } from '../utils/APIRoutes'
import app_logo from "../assets/app_logo.png"
import { FaUser } from "react-icons/fa";
import { IoLockClosedSharp,IoLockOpenSharp } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";


 import "./CssFiles/Register.css"



function Register() {
  const navigate = useNavigate()
 
  const [UserData, setUserData] = useState({
    username :"",
    email:"",
    phoneNumber:null,
    about : "",
    socialLinks :{
      facebookUrl : "",
      youtubeUrl : "",
      InstagramUrl : "",
    },
    password: "",
    confirmPassword :"" 
  })
  const [avatarImage, setAvatarImage] = useState(null)

  const toastOptions = {
      position:'bottom-right',
      autoClose:7000,
      draggable:true,
      pauseOnHover:true,
     
  }

const handleSubmit = async (event)=>{
  event.preventDefault()
  if(handeValidation()){
    // console.log("in Validation", registerRoute);
    const {password,username,email,phoneNumber,about,socialLinks} = UserData
    const response = await axios.post(registerRoute,{
      password,username,email,phoneNumber,about,socialLinks, avatarImage
    },{ headers: {
      "Content-Type": "multipart/form-data",
     }})
    // console.log(response.user)
if(response.data.status===false){
  toast.error(response.data.msg ,toastOptions)
}

if(response.data.status===true){
  localStorage.setItem("chat-app-user",JSON.stringify(response.data.user))

  toast.success(response.data.msg,toastOptions)
  navigate("/chatroom")
}



  }
 
}
const handeValidation = ()=>{
  const {password,confirmPassword,username,email} = UserData

  if(password !== confirmPassword){
    toast.error("Password and Confirm Password should be same",toastOptions)
    return false
  }
  else if(username.length<3){
    toast.error("Username Should be greater than 3 character",toastOptions)
    return false
  }
  else if(password.length<6){
    toast.error("Password length should be greater than 6",toastOptions)
    return false
  }
  else if(email === ""){
    toast.error("Please enter a valid email",toastOptions)
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

    <div className='Register'>


       <div className="brand">
        <img src={app_logo} alt="SwiftTalk" height={70} srcset="" />
    
       </div>
       <form enctype="multipart/form-data" onSubmit={(event)=>{handleSubmit(event)}} id="register-form">
     
       <div className="input-boxes">
       <div className="input-box"> 
       <label htmlFor="avatarImage">Upload Your Avatar</label>
  <div className="icon"><FaUserCircle /></div>
  <input type='file'name='avatarImage' accept="image/*" onChange={(e) => { setAvatarImage(e.target.files[0])}}/>
  </div>
  
       <div className="input-box"> 
  <div className="icon"><FaUser /></div>
  <input type='text' placeholder='Username' name='username' onChange={(e)=>{handleChange(e)}}/>
  </div>




  <div className="input-box"> 
  <div className="icon"><AiOutlineMail /></div>
  <input type='email' placeholder='Email Id' name='email' onChange={(e)=>{handleChange(e)}}/>
  </div>
  <div className="input-box"> 
  <div className="icon"><MdOutlinePhone/></div>
  <input type='number' placeholder='Phone Number' name='phoneNumber' onChange={(e)=>{handleChange(e)}}/>
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

  <div className="input-box"> 
  <div className="icon" onClick={()=>{visiblePasword()}}>
        {visible === "password" ? (
          <IoLockClosedSharp />
        ) : (
          <IoLockOpenSharp />
        )}
      </div>  <input type={visible} placeholder='Confirm Password' name='confirmPassword' onChange={(e)=>{handleChange(e)}}/>
  </div>

</div>



<div className="mid-line">
<button className='form-btn' type='submit'>Create Account</button>
</div>
      
      <span>
        <p>Already Have An Account ?</p>
       </span>

       </form>
       <Link  className='option-btn' to="/login">Log In</Link>
       <ToastContainer/>
    </div>
    
  )
}



export default Register
