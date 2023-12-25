import React, { useEffect, useState  } from 'react'
import {useNavigate} from "react-router-dom"
import Contacts from '../components/Contacts'
import axios from "axios"
import "./CssFiles/ChatRoom.css"
import { allUsersRoute } from '../utils/APIRoutes'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'

function ChatRoom() {
 const navigate = useNavigate() 

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
      <div id="logo">Logo</div>
      <div className="chat-components">
      <Contacts contacts ={contacts} currentUser = {currentUser} changeChat = {handleChatChange}/>
      {
        IsLoaded && currentChat === undefined ? ( <Welcome  currentUser = {currentUser}/>) : (<ChatContainer/>)
      }
     
      </div>
    </div>
  )
}

export default ChatRoom