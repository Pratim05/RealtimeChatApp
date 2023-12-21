import React, { useEffect, useState  } from 'react'
import {useNavigate} from "react-router-dom"
import Contacts from '../components/Contacts'
import axios from "axios"
import ChatMassage from '../components/ChatMassage'
import "./CssFiles/ChatRoom.css"
import { allUsersRoute } from '../utils/APIRoutes'

function ChatRoom() {
 const navigate = useNavigate() 

 const [contacts, setContacts] = useState([])
 const [currentUser, setCurrentUser] = useState(undefined)


 useEffect(() => {
  const fetchData = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    }
  };

  fetchData();
}, [navigate]);

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




  return (
    <div id='chatroom'>
      <div id="logo">Logo</div>
      <div className="chat-components">
      <Contacts contacts ={contacts} currentUser = {currentUser}/>
      <ChatMassage/>
      </div>
    </div>
  )
}

export default ChatRoom