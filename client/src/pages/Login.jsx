import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {ToastContainer , toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { loginRoute } from '../utils/APIRoutes'

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


  return (

    <div className='Login'>
       <form onSubmit={(event)=>{handleSubmit(event)}}>

       <div className="brand">
        <img src="" alt="" srcset=""/>
        <h1>SwiftTalk</h1>
       </div>

       <input type='text' placeholder='Username' name='username' onChange={(e)=>{handleChange(e)}}/>
      
       <input type='password' placeholder='Password' name='password' onChange={(e)=>{handleChange(e)}}/>
       

       <button className='form-btn' type='submit'>Log in</button>
       <span>
        <p>Don't Have An Account ?</p><Link to="/register">Create an Account</Link>
       </span>

       </form>
       <ToastContainer/>
    </div>
    
  )
}
