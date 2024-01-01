import React from 'react'
import default_avatar from "../assets/default_avatar.png"
import Chatinput from './Chatinput'
import Messages from './Messages'
import { sendMessageRoute } from '../utils/APIRoutes'
import axios from 'axios'

function ChatContainer({currentChat,currentUser}) {
  const handleSendMsg = async(msg)=>{
    await axios.post(sendMessageRoute,{
      from: currentUser._id,
      to :currentChat._id,
      message : msg,
    })
      
  }

  return (
    <div>
      {currentChat && (
        <div className="ChatContainer">
          <div className="chat-header">
            <div className="avatar">
              <img src={default_avatar} alt="" height={50} />
            </div>
            <div className="username">{currentChat.username}</div>

          </div>
          <div className="chat-massages"><Messages/></div>
          <div className="chat-inputBox">
            <Chatinput handleSendMsg = {handleSendMsg} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatContainer