import React, { useEffect, useState } from 'react'



function Contacts({contacts, currentUser}) {

  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)


useEffect(()=>{
  if(currentUser){
    setCurrentUserName(currentUser.name)
    setCurrentUserImage(currentUser.avatarImage)
  }
},[currentUser])

const changeCurrentChat = (index,contact) =>{

}

  return (
    <div className='Contacts'>
      <div id="contats-nav"></div>
      <div className="allContactsList">{
        contacts.map((contact,index)=>{
          return(
            <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index}>
              <img className='contact-profile-img' src="" alt="profile"  />
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