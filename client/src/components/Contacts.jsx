import React, { useEffect, useState } from 'react'
import default_avatar from "../assets/default_avatar.png"
import { FcEditImage } from "react-icons/fc";
import { TbUserSearch } from "react-icons/tb";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import ProfileEdit from "../components/ProfileEdit";

import Model from "react-modal";
Model.setAppElement("#root"); 





function Contacts({contacts, currentUser ,changeChat}) {

  const navigate = useNavigate()
  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)
  const [OpenModal, setOpenModal] = useState(false)


useEffect(()=>{
  if(currentUser){
    setCurrentUserName(currentUser.username)
    setCurrentUserImage(currentUser.avatarImage)
  }
},[currentUser])

const changeCurrentChat = (index,contact) =>{
  setCurrentSelected(index)
  changeChat(contact)

}

const handleLogout = ()=>{
  localStorage.clear()
  navigate("/")

}

  return (
    <div className='Contacts'>
      <Model isOpen={OpenModal} onRequestClose = {()=>setOpenModal(false)} style={{
          content:{
            width:"450px",
            height:"550px",
            
            margin: "0 auto"
          }
          
        }} >

<ProfileEdit/>

  </Model>
      <div id="user-profile">
        <img src={default_avatar} height={50} alt="" />
        <h3>{currentUserName}</h3>
        <div className="icon">
          <FcEditImage id='edit'onClick={()=>setOpenModal(true)}/>
          <BiPowerOff id='logout' onClick={()=>{handleLogout()}} />
          </div>
       
      </div>
      <div className="search-area">
        <div className="icon"><TbUserSearch /></div>
        <input type="text" placeholder='Search Contacts' />
      </div>

      <div className="allContactsList">{
        contacts.map((contact,index)=>{
          return(
            <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={()=>{changeCurrentChat(index,contact)}}>
              <img className='contact-profile-img' src={default_avatar} alt="profile"  height={30}/>
              <h3 className="contact-name">{contact.username}</h3>
     
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default Contacts