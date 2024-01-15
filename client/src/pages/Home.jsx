import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./CssFiles/Home.css"
import app_logo from "../assets/app_logo.png"
import chat_gif from "../assets/chat_gif.gif"

function Home() {
 const navigate = useNavigate()



  return (
    <div className='homepage'>
      
      <div className="header">
        <div>
          <div id="nav-text">
          <img src={app_logo} alt="" height={70}  />
          <h2>Swift Talk </h2>
          </div>
         
        </div>
        <div>
        <nav class="nav-bar">
              <a href="#" >Product</a>
              <a href="#" >Services</a>
              <a href="#" >Contact</a>
              <a href="#" >Log In</a>
        </nav>
        </div>
      
      </div>

      <div className="body">

        




        <div className="left-body">
           
          <h1>Your words, their destination - in an instant. Real-time chatting redefined</h1>
          <h6>Breaking the barriers of time: Chat now, not later</h6>
          <div className="L-R-buttons">
            <button id="login"onClick={()=>{navigate("/login")}}>login</button>
            <button id="register" onClick={()=>{navigate("/register")}}>Create an account now</button>
          </div>
        </div>

        <div className="right-body">
        <div id="img-b">
        <img src={chat_gif} alt="" id="img1"  />
        </div>
        </div>
      </div>
    
    
    
    
    </div>
  )
}

export default Home