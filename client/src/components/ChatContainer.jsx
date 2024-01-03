import React, { useEffect, useRef, useState } from 'react'
import default_avatar from "../assets/default_avatar.png"
import Chatinput from './Chatinput'
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes'
import axios from 'axios'
import '../pages/CssFiles/ChatMessages.css'
import {v4 as uuid} from "uuid"

function ChatContainer({currentChat,currentUser , socket}) {

  const [messages , setMessages] = useState([])
  const [arrivalMessage , setArrivalMessage] = useState(null)
 const scrollRef = useRef()
  
useEffect(()=> {
  async function fetchMessages (){
    if(currentChat){
      try{
        const response = await axios.post(getAllMessagesRoute,{
          from : currentUser._id,
          to : currentChat._id,
        })
        setMessages(response.data)
  
      }catch(e){
        console.log("Error in fetching Messages" ,e );
        
      }
    }
    
   
  }
  fetchMessages()
  
},[currentChat])

 const handleSendMsg = async(msg)=>{
    await axios.post(sendMessageRoute,{
      from: currentUser._id,
      to :currentChat._id,
      message : msg,
    })
    socket.current.emit("send-msg",{
      from: currentChat._id,
      to :currentUser._id,
      message : msg,
    })
    const msgs = [...messages]
    msgs.push({fromSelf:true , message:msg})
    setMessages(msgs)
  }
 
  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieved",(msg)=>{
        setArrivalMessage({fromSelf:false, message:msg})
      })
    }

  },[])

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage])

  },[arrivalMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"})

  },[messages])




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
          <div className="chat-massages">

{
  messages.map((message)=>{
    return (
      <div className={`message ${message.fromSelf ? "sended": "recieved"}`} ref={scrollRef} key ={uuid()}>
          <div className="content">
            <p>
              {message.message}
            </p>
          </div>
      </div>
    )
  
  }
  )
}

          </div>
          <div className="chat-inputBox">
            <Chatinput handleSendMsg = {handleSendMsg} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatContainer