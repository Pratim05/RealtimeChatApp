import React from 'react'
import welcome from "../assets/welcome.gif"

function Welcome({currentUser}) {
    
  return (
    <div className='ChatMassage'>
        <img src={welcome} alt="Welcome" />
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to start Messaging</h3>
    </div>
  )
}

export default Welcome