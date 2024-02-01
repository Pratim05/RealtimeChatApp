import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {ToastContainer , toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { registerRoute, sendotpRoute, verifyotpRoute } from '../utils/APIRoutes'
import app_logo from "../assets/app_logo.png"
import { FaUser } from "react-icons/fa";
import { IoLockClosedSharp,IoLockOpenSharp } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Model from "react-modal";

 import "./CssFiles/Register.css"

Model.setAppElement("#root"); 



function Register() {
  const navigate = useNavigate()
  const [OpenModal, setOpenModal] = useState(false)
 
  const [UserData, setUserData] = useState({
    username :"",
    email:"",
    phoneNumber:"",
    about : "",
    password: "",
    confirmPassword :"" 
  })
  const [avatarImage, setAvatarImage] = useState(null)
  const [otp, setOtp] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)

  const toastOptions = {
      position:'bottom-right',
      autoClose:7000,
      draggable:true,
      pauseOnHover:true,  
  }

  const sendEmailOtpVerifcation = async ()=>{
    try {
      const {email} = UserData
      // console.log(email)
      const response = await axios.post(sendotpRoute,{email})
      if(response.data.status===false){
        toast.error(response.data.msg ,toastOptions)
      }
      if(response.data.status==='pending'){
        setOpenModal(true)
        toast.success(response.data.msg ,toastOptions)
      }
      
    } catch (error) {
      console.log(error)
    }
   
  }

  const handleVerifyEmailOtp = async (event)=>{
    try {
      event.preventDefault()
      const {email} = UserData
      const response = await axios.post(verifyotpRoute,{otp,email})
      // console.log(response.data)
      
      if(response.data.status===false){
        toast.error(response.data.msg ,toastOptions)
      }
      if(response.data.status==="Expired"){
        toast.error(response.data.msg ,toastOptions)
        setOpenModal(false)
      }
      if(response.data.status==="wrong"){
        toast.error(response.data.msg ,toastOptions)
      }
      if(response.data.status===true){
        toast.success(response.data.msg ,toastOptions)
        setEmailVerified(true)
        setOpenModal(false)
      }
    } catch (error) {
      console.log(error)
    }

  }

const handleSubmit = async (event)=>{
  try {
    event.preventDefault()
    if(emailVerified){
  if(handeValidation()){
    // console.log("in Validation", registerRoute);
    const {password,username,email,phoneNumber,about} = UserData
    const response = await axios.post(registerRoute,{
      password,username,email,phoneNumber,about, avatarImage
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
    }else{
      toast.error("Please Verify Your Email ID",toastOptions)
    }
  } catch (error) {
    console.log(error)
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
       <div className="resetModel">
       <Model isOpen={OpenModal} onRequestClose = {()=>setOpenModal(false)}  style={{
          content:{
            width:"200px",
            height:"300px",
            margin: "200px auto",
          }
          
        }}>
          <h2 className="forget-head">Enter The OTP</h2>
               <form className= "forget-pass" action="" onSubmit={(event) => {
          handleVerifyEmailOtp(event);
        }}>
                <input type="number" placeholder='4 Digit OTP' name="otp" id="otp" onChange={(e)=>setOtp(e.target.value)} />

               <input className="form-btn" type="submit" value="Verify OTP"/>
               </form>
        </Model>
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
  <div className="icon">
  {emailVerified ? (
          <MdMarkEmailRead />
        ) : (
          <AiOutlineMail />
        )}
  </div>
  <input type='email' placeholder='Email Id' name='email' onChange={(e)=>{handleChange(e)}}/>
  {!emailVerified ? (<div className='form-btn verify-btn'  onClick={()=>sendEmailOtpVerifcation()}>Verify</div>): (<></>) }
  
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
      
    </div>
    
  )
}



export default Register
