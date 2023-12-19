import React, { useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import {ToastContainer , toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { registerRoute } from '../utils/APIRoutes'
function Register() {
 
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
      theme:"dark"
  }

const handleSubmit = async (event)=>{
  event.preventDefault()
  if(handeValidation()){
    const {password,confirmPassword,username,email} = UserData
    const response = await axios.post(registerRoute,{
      username,email,password
    })

  }
  alert('form submited')
}
const handeValidation = ()=>{
  const {password,confirmPassword,username,email} = UserData

  if(password!==confirmPassword){
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
        <h1>SwiftTalkie</h1>
       </div>

       <input type='text' placeholder='Username' name='username' onChange={(e)=>{handleChange(e)}}/>
       <input type='email' placeholder='Email Id' name='username' onChange={(e)=>{handleChange(e)}}/>
       <input type='password' placeholder='Password' name='password' onChange={(e)=>{handleChange(e)}}/>
       <input type='password' placeholder='Confirm Password' name='confirmpassword' onChange={(e)=>{handleChange(e)}}/>

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
