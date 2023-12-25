import React from 'react'
import default_avatar from "../assets/default_avatar.png"

function ChatContainer({currentChat}) {

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
          <div className="chat-massages"></div>
          <div className="chat-inputBox">
            <input type="text" />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatContainer