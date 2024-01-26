import React, { useEffect, useRef, useState } from "react";
import default_avatar from "../assets/default_avatar.png";
import Chatinput from "./Chatinput";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import "../pages/CssFiles/ChatMessages.css";
import { FcInfo } from "react-icons/fc";
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, currentUser, socket ,setnotification}) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const [MsgSender, setMsgSender] = useState('')
  

  function convertImageUrl(User) {
    let avatarImageUrl = default_avatar;
    if (User.avatarImage.data !== null) {
      try {
        const imageDataArray = User.avatarImage.data.data;
        // Convert the image data array to a Base64 encoded string
        const base64String = btoa(String.fromCharCode(...imageDataArray));
        // Construct the data URL for Profile Image
        avatarImageUrl = `data:${User.avatarImage.contentType};base64,${base64String}`;
        return avatarImageUrl;
      } catch (error) {
        console.log(error);
      }
    } else {
      return avatarImageUrl;
    }
  }

  useEffect(() => {
    console.log("useeffect", socket.current);
    if (socket.current) {
      console.log("Socket connection status:", socket.current.connected);
      socket.current.on("msg-recieve", (data) => {    
        setArrivalMessage({ fromSelf: false, message: data.message });
         setMsgSender(data.from)
      });
      console.log("Event listener setup completed");
    }
  },[currentChat]);

  useEffect(() => {
    async function fetchMessages() {
      if (currentChat) {
        try {
          const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        } catch (e) {
          console.log("Error in fetching Messages", e);
        }
      }
    }
    fetchMessages();
  }, [currentChat]);




  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };


  
 
 




  useEffect(() => {
    if(currentChat && arrivalMessage){
    if(MsgSender===currentChat._id){
       arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }else if(MsgSender!==currentChat._id){
      setnotification({sender : MsgSender , message: arrivalMessage.message})
    }
  }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div>
      {currentChat && (
        <div className="ChatContainer">
          <div className="chat-header">
            <div className="avatar_name">
             <img src={convertImageUrl(currentChat)} alt="" height={50} />
            <div className="username">{currentChat.username}</div>
            </div>
          <div className="icon contact-info"><FcInfo/></div>
          </div>
          <div className="chat-massages">
            {messages.map((message) => (
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
                key={uuidv4()}
                ref={scrollRef}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-inputBox">
            <Chatinput handleSendMsg={handleSendMsg} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
