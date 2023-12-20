import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {ToastContainer , toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { registerRoute } from '../utils/APIRoutes'

function Register() {
  const navigate = useNavigate()
 
  const [UserData, setUserData] = useState({
    username :"",
    email:"",
    password: "",
    confirmPassword :"" 
  })

  const toastOptions = {
      position:'bottom-right',
      autoClose:7000,
      draggable:true,
      pauseOnHover:true,
      theme:"colored"
  }

const handleSubmit = async (event)=>{
  event.preventDefault()
  if(handeValidation()){
    console.log("in Validation", registerRoute);
    const {password,username,email} = UserData
    const response = await axios.post(registerRoute,{
      username,email,password
    })
    // console.log(response.user)
if(response.data.status===false){
  toast.error(response.data.msg ,toastOptions)
}
if(response.data.status===true){
  localStorage.setItem("chat-app-user",JSON.stringify(response.config.data))
  toast.success(response.data.msg ,toastOptions)
  navigate("/")
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


  return (

    <div className='Register'>
       <form onSubmit={(event)=>{handleSubmit(event)}}>

       <div className="brand">
        <img src="" alt="" srcset="" />
        <h1>SwiftTalk</h1>
       </div>

       <input type='text' placeholder='Username' name='username' onChange={(e)=>{handleChange(e)}}/>
       <input type='email' placeholder='Email Id' name='email' onChange={(e)=>{handleChange(e)}}/>
       <input type='password' placeholder='Password' name='password' onChange={(e)=>{handleChange(e)}}/>
       <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={(e)=>{handleChange(e)}}/>

       <button className='form-btn' type='submit'>Create Account</button>
       <span>
        <p>Already Have An Account ?</p><Link to="/login">Log In</Link>
       </span>

       </form>
       <ToastContainer/>
    </div>
    
  )
}



export default Register
