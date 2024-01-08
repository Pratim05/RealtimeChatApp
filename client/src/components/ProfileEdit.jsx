import React, { useState } from 'react'
import '../pages/CssFiles/ProfileEdit.css'
import { FaUser } from "react-icons/fa";
import { IoLockClosedSharp,IoLockOpenSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

function ProfileEdit({currentUser}) {

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
    <div id='ProfileEdit'>
        <div className="header">
            <div className="icon"></div>
            <h4>Edit Profile</h4>
            <div className="icon"></div>
        </div>
        <form >
            <div className="inputs">
                <label htmlFor="">Username</label>
                <div className="inputBox">
                    <input type="text" placeholder='Username' />
                    <div className="icon"><FaUser/></div>
                </div>
            </div>
            <div className="inputs">
                <label htmlFor="">Avatar</label>
                <div className="inputBox " >
                    <img id='profileImg' src="" alt="img"/>
                    <input type="file" />
                </div>
            </div>
            <div className="inputs">
                <label htmlFor="">Phone</label>
                <div className="inputBox">
                    <input type="number" placeholder='91**********' />
                    <div className="icon"><FaPhone /></div>
                </div>
            </div>
            <div className="inputs">
                <label htmlFor="">Change Password</label>
                <div className="inputBox">
                    <input type={visible} placeholder='Password' />
                    <div className="icon" onClick={()=>{visiblePasword()}}>
        {visible === "password" ? (
          <IoLockClosedSharp />
        ) : (
          <IoLockOpenSharp />
        )}
      </div> 
                </div>
            </div>
            <div className="inputs">
           
                <label htmlFor="">About</label>
                <textarea name="" id="" cols="45" rows="10" placeholder='About Yourself'></textarea>
            </div>
            <div className="inputs">
           
                <label htmlFor="">Social Links</label>
                <div className="inputBox">
               <input type="url" placeholder='Youtube Channel'/>
               <div className="icon"><BsYoutube /></div>
                </div>
                <div className="inputBox">
               <input type="url" placeholder='Facebook Profile'/>
               <div className="icon"><FaFacebook /></div>
                </div>
                <div className="inputBox">
               <input type="url" placeholder='Instagram Profile'/>
               <div className="icon"><AiFillInstagram /></div>
                </div>
               
            </div>


            <div className="Button" ><input className='form-btn' type="submit" value="Save" /></div>

        </form>
    </div>
  )
}

export default ProfileEdit