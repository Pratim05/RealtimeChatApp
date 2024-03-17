import React, { useEffect, useRef, useState } from "react";
import default_avatar from "../assets/default_avatar.png";
import Chatinput from "./Chatinput";
import { getAllMessagesRoute, sendMessageRoute ,addNotificationRoute} from "../utils/APIRoutes";
import axios from "axios";
import "../pages/CssFiles/ChatMessages.css";
import { FcInfo } from "react-icons/fc";
import { v4 as uuidv4 } from "uuid";
import Model from 'react-modal';
import ContactInfo from "./ContactInfo";
import { DocxFilesComp, ExcelFilesComp, ImageFilesComp, PdfFilesComp, TextFilesComp } from "./FilesComponent/FilesComp";
Model.setAppElement('#root');


function ChatContainer({ currentChat, currentUser, socket ,setnotification}) {
  const [openModal, setOpenModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const [MsgSender, setMsgSender] = useState('')
  const [MsgRefresh, setMsgRefresh] = useState(false)
  

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
    // console.log("useeffect", socket.current);
    if (socket.current) {
      // console.log("Socket connection status:", socket.current.connected);
      socket.current.on("msg-recieve", (data) => {    
        setArrivalMessage({ fromSelf: false, message: data.message , file:data.file,fileType: data.fileType });
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
  }, [currentChat],[openModal]);




  const handleSendMsg = async (msg, file, fileType) => {
   
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
      file : file,
      fileType: fileType
    },
    {headers: {
      'Content-Type': 'multipart/form-data'
    }});
    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
      file: file,
      fileType: fileType
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg , file: file, fileType: fileType });
    setMessages(msgs);
  };

 

  
 
 




  useEffect(() => {
    if(currentChat && arrivalMessage){
    if(MsgSender===currentChat._id){
       arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }else if(MsgSender!==currentChat._id){
      setnotification({sender : MsgSender , message: arrivalMessage.message, reciever :currentUser._id,})
      // Savenotification(MsgSender,arrivalMessage,currentUser)
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
          <Model
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={{
          content: {
            width: '360px',
            height: '550px',
            margin: '0 auto',
            background:'',
            border:''
          },
        }}
      >
    <ContactInfo currentChat ={currentChat} currentUser={currentUser} convertImageUrl={convertImageUrl} setOpenModal={setOpenModal} setMsgRefresh={setMsgRefresh}/>
      </Model>
          <div className="chat-header">
            <div className="avatar_name">
             <img src={convertImageUrl(currentChat)} alt="" height={50} />
            <div className="username">{currentChat.username}</div>
            </div>
          <div className="icon contact-info" onClick ={() => setOpenModal(true)} ><FcInfo/></div>
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
  {
    // First, check if there is no file or the file object is empty
    (message.file && Object.keys(message.file).length === 0) || message.file === null ? (
      <p>{message.message}</p>
    ) : (
      // Then, based on the fileType, decide which component to render
      message.fileType === 'image' ? (
        <ImageFilesComp file={message.file} />
      ) : message.fileType === 'pdf' ? (
        <PdfFilesComp file={message.file} />
      ) :message.fileType === 'word' ? (
        <DocxFilesComp file={message.file} />
      ) :message.fileType === 'excel' ? (
        <ExcelFilesComp file={message.file} />
      ):message.fileType === 'text' ? (
        <TextFilesComp file={message.file} />
      ):
      
      (
        // If neither, you can render a fallback or nothing
        <p>Unsupported file type</p>
      )
    )
  }
</div>

              </div>
            ))}
          </div>
          <div className="chat-inputBox">
            <Chatinput handleSendMsg={handleSendMsg}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
