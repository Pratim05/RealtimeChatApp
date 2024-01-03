import React, { useEffect, useRef, useState  } from 'react'
import {useNavigate} from "react-router-dom"
import Contacts from '../components/Contacts'
import axios from "axios"
import "./CssFiles/ChatRoom.css"
import { allUsersRoute, host } from '../utils/APIRoutes'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import app_logo from "../assets/app_logo.png"

import {io} from "socket.io-client"

function ChatRoom() {
 const navigate = useNavigate() 
const socket = useRef()
 const [contacts, setContacts] = useState([])
 const [currentUser, setCurrentUser] = useState(undefined)
 const [currentChat, setCurrentChat] = useState(undefined)
 const [IsLoaded, setIsLoaded] = useState(false)


 useEffect(() => {
  const fetchData = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true)
    }
  };

  fetchData();
}, []);


 useEffect(() => {
  if(currentUser){
    socket.current = io(host)
    socket.current.emit("add-user", currentUser._id)
  }
 
}, [currentUser]);



useEffect(() => {
  const fetchData = async () => {
    if (currentUser) {
      try {
        const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    }
  };

  fetchData();
}, [currentUser]);
// console.log(currentUser);

const handleChatChange = (chat)=>{
  setCurrentChat(chat)
}


  return (
    <div id='chatroom'>
      <div id="logo"><img src={app_logo} alt="Logo" height={70} /></div>
      <div className="chat-components">
      <Contacts contacts ={contacts} currentUser = {currentUser} changeChat = {handleChatChange}/>
      {
        IsLoaded && currentChat === undefined ? ( <Welcome  currentUser = {currentUser}/>) : (<ChatContainer currentChat = {currentChat} currentUser ={currentUser} socket = {socket}/>)
      }
     
      </div>
    </div>
  )
}

export default ChatRoom