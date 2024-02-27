import React, { useState } from 'react'
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
import { SiAddthis } from "react-icons/si";
import { AiFillCloseSquare } from "react-icons/ai";


function Chatinput({handleSendMsg}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg , setMsg] = useState("")

  const [file , setFile] = useState(undefined)
  


  
const handleEmojipickerHideShow = ()=>{
    setShowEmojiPicker(!showEmojiPicker)
}
const handleEmojiClick = (event , emoji)=>{
 
  let message = msg
  message += event.emoji
  setMsg(message)

}

const fileUpload = (event) => {
  const files = event.target.files;
  setFile(files)
  const filesLength = files.length;
  if (filesLength > 0) {
    const imageSrc = URL.createObjectURL(files[0]);
    const imagePreviewElement = document.querySelector("#uploaded-image");
    imagePreviewElement.src = imageSrc;
    imagePreviewElement.style.display = "block";
    document.querySelector(".hidden-close").style.display ='block'
  }
};

const CancelFileUpload = ()=>{
  setFile(undefined)
  document.querySelector("#uploaded-image").style.display ='none'
  document.querySelector(".hidden-close").style.display ='none'
}

const sendChat = (event)=>{
  event.preventDefault()
  if(msg.length >0 && (!file)){
    handleSendMsg(msg,null)
    setMsg("")
  }
 else if(file && msg.length >0){
    handleSendMsg(msg,file)
    setFile(undefined)
    setMsg("")
    document.querySelector("#uploaded-image").style.display ='none'
    document.querySelector(".hidden-close").style.display ='none'
  }
 else if(file && msg.length === 0){
    handleSendMsg(null,file)
    setFile(undefined)
    document.querySelector("#uploaded-image").style.display ='none'
    document.querySelector(".hidden-close").style.display ='none'
  }

}

  return (
    <div className='Chatinput'>
      <div className="button-conatiner">
        <div className="emoji">
        <BsEmojiSmileFill onClick={handleEmojipickerHideShow}/>
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} height={400} width={300} size ={20}/>}
        </div>
      </div>
      <form method='POST' className='input-container' encType='multipart/form-data' onSubmit={(e)=>{sendChat(e)}}>
        <input type="text" placeholder='Enter Your Message Here...' value={msg} onChange={(e)=>{setMsg(e.target.value)}}/>

        <div class="img-view">
    <img id="uploaded-image" height={110} width={110}/>
    <span className='hidden-close' ><AiFillCloseSquare onClick={()=>CancelFileUpload()} /></span>
  </div>

        <label for="file-upload" id='AddDoc'><SiAddthis /></label>
        <input type="file" id="file-upload" accept="image/*" onChange={fileUpload} hidden />
        <button id='sendBtn' className='submit'>
          <IoMdSend/>
        </button>
      </form>
      

    </div>
  )
}

export default Chatinput