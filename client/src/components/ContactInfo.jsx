import React from 'react'
import '../pages/CssFiles/ContactInfo.css'

import { MdMarkEmailRead } from "react-icons/md"
import { RiPhoneFill } from "react-icons/ri"
import { TfiFacebook } from "react-icons/tfi"
import { RiInstagramFill } from "react-icons/ri"
import { SiYoutube } from "react-icons/si"



function ContactInfo({currentChat,convertImageUrl}) {
  return (
    <div className='ContactInfo'>
       
       <div className="profile_img">
        <img src="" alt="Your Profile Photo" />
       </div>

       <h3 className="contact-name">Pratim Bera</h3>
    <div  className='contact-email'>
      <h5>pratimbera@gmail.com</h5>
      <div className="icon"><MdMarkEmailRead />
</div>
    </div>
    <div  className='contact-number'>
      <div className="icon"><RiPhoneFill /></div>
      <h5>7478363309</h5>
    </div>
    <div className="contact-about">
      <p className="about">Hi, I am using SwiftTalk </p>
    </div>
<div className="social-icons">
  <div className="Icons"><TfiFacebook /></div>
  <div className="Icons"><RiInstagramFill /></div>
  <div className="Icons"><SiYoutube /></div>
</div>

<div className="buttons">
  <button className="form-btn clear-btn">Clear Chat</button>
  <button className="form-btn openChat-btn">Open Chat</button>
  
</div>



    </div>
  )
}

export default ContactInfo