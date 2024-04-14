import React from 'react'
import '../pages/CssFiles/ContactInfo.css'

import { MdMarkEmailRead } from "react-icons/md"
import { RiPhoneFill } from "react-icons/ri"
import { TfiFacebook } from "react-icons/tfi"
import { RiInstagramFill } from "react-icons/ri"
import { SiYoutube } from "react-icons/si"
import axios from 'axios'
import { clearchatRoute } from '../utils/APIRoutes'
import {ToastContainer , toast} from "react-toastify"


function ContactInfo({currentChat,currentUser,convertImageUrl,setOpenModal,setMsgRefresh}) {

  const toastOptions = {
    position:'bottom-right',
    autoClose:5000,
    draggable:true,
    pauseOnHover:true,
   
}

const ClearChat = async(currentChatId,currentUserId) =>{
 
 try {
  const response = await axios.post(clearchatRoute,{
    currentChatId,currentUserId
  })
 
  toast.success(`${response.data.deletedCount} Messages is Cleared` ,toastOptions)
  setMsgRefresh(true)
 } catch (error) {
  console.log(error)
 }
}

function OpenChat() {
  setOpenModal(false)
  setMsgRefresh(false)
}


  return (
    <div className='ContactInfo'>
       
       <div className="profile_img">
       <img src={convertImageUrl(currentChat)} alt="Profile Picture" height={50} />
       </div>

       <h3 className="contact-name">{currentChat.username}</h3>
    <div  className='contact-email'>
      <h5>{currentChat.email}</h5>
      <div className="icon"><MdMarkEmailRead />
</div>
    </div>
    <div  className='contact-number'>
      <div className="icon"><RiPhoneFill /></div>
      <h5>{currentChat.phoneNumber}</h5>
    </div>
    <div className="contact-about">
      <p className="about">{currentChat.about}</p>
    </div>
<div className="social-icons">
  <div className="Icons facebook"><TfiFacebook /></div>
  <div className="Icons instagram"><RiInstagramFill /></div>
  <div className="Icons youtube"><SiYoutube /></div>
</div>

<div className="buttons">
  <button onClick={()=>ClearChat(currentChat._id,currentUser._id)} className="form-btn clear-btn">Clear Chat</button>
  <button onClick={() => OpenChat()} className="form-btn openChat-btn">Open Chat</button>
  
</div>



    </div>
  )
}

export default ContactInfo