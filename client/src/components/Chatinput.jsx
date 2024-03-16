import React, { useState } from 'react'
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
import { SiAddthis } from "react-icons/si";
import { ImCross } from "react-icons/im";

import { AiFillCloseSquare } from "react-icons/ai";


function Chatinput({handleSendMsg}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg , setMsg] = useState("")
  const [message, setMessage] = useState("")
  
  const [file , setFile] = useState(undefined)
  const [fileType , setFileType] = useState('')

  const [showUploadButtons, setShowUploadButtons] = useState(false);
  


  
const handleEmojipickerHideShow = ()=>{
    setShowEmojiPicker(!showEmojiPicker)
}
const handleKeyDown = (event) => {
  // Check if the backspace key is pressed
  if (event.keyCode === 8) {
    // Prevent the default behavior of the backspace key
   
    let message = msg;
    // Remove the last character from the message
    message = message.slice(0, -1);
    setMsg(message);
  }
};
const handleEmojiClick = (event , emoji)=>{
 
  //  let message = msg
  // message += event.emoji
  // console.log(message)
  // setMsg(message)
  setMsg(prevMsg => prevMsg + event.emoji);

}

const fileUpload = (event,fileType) => {
  console.log('FileType ', fileType, event.target.files )
  setShowUploadButtons(false)
  setFileType(fileType)
  const files = event.target.files;
  setFile(files)
  const filesLength = files.length;

  if (filesLength > 0 && fileType === 'image') {
    const imageSrc = URL.createObjectURL(files[0]);
    const imagePreviewElement = document.querySelector("#uploaded-image");
    imagePreviewElement.src = imageSrc;
    imagePreviewElement.style.display = "block";
    document.querySelector(".hidden-close").style.display ='block'
  }
  else if(filesLength > 0 && fileType !== 'image'){
    document.querySelector(".preview").style.display ='block'
  }
};

const CancelFileUpload = ()=>{
  setFile(undefined)
  if(fileType === 'image'){
  document.querySelector("#uploaded-image").style.display ='none'
  document.querySelector(".hidden-close").style.display ='none'
  }else{
    document.querySelector(".preview").style.display ='none'
  }
}

const sendChat = (event)=>{
 try {
 
  // console.log('file',fileType,file)
  event.preventDefault()
  setShowEmojiPicker(false)
  if(msg.length >0 && (!file)){
    handleSendMsg(msg,null,fileType)
    setMsg("")
  }
 else if(file && msg.length >0){
    handleSendMsg(msg,file,fileType)
    setFile(undefined)
    setMsg("")
    document.querySelector(".preview").style.display ='none'
    if(fileType=== 'image'){
    document.querySelector("#uploaded-image").style.display ='none'
    document.querySelector(".hidden-close").style.display ='none'
    }
  }
 else if(file && msg.length === 0){
    handleSendMsg(null,file,fileType)
    setFile(undefined)
    document.querySelector(".preview").style.display ='none'
    if(fileType=== 'image'){
      document.querySelector("#uploaded-image").style.display ='none'
      document.querySelector(".hidden-close").style.display ='none'
      }
  }
 } catch (error) {
  console.log(error)
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
        <input type="text" placeholder='Enter Your Message Here...' value={msg} onChange={(e)=>{setMsg(e.target.value)}}   onKeyDown={handleKeyDown}/>

    <div class="img-view">
    { fileType === 'image' ? (<img id="uploaded-image" height={110} width={110}/>) : (<div className='preview'><p>{file && file[0]?.name}</p><span className='file-close'><AiFillCloseSquare size={25} onClick={()=>CancelFileUpload()} /></span></div>)  }
    {/* <img id="uploaded-image" height={110} width={110}/> */
    file && console.log(file[0].name)
    }
    <span className='hidden-close' ><AiFillCloseSquare onClick={()=>CancelFileUpload()} /></span>
    
  </div>
        

        

         
      <div className='AddDoc' onClick={() => setShowUploadButtons(!showUploadButtons)}>
        {showUploadButtons ? (<ImCross />) : (<SiAddthis />)}
      </div>
      {showUploadButtons && (
        <div className='UploadBtns'>
          <div >
            {/* Button for uploading PDF documents */}
            <input type="file"  id="img-upload" accept="image/*" style={{ display: 'none' }} onChange ={(e)=>fileUpload(e,'image')}/>
            <label htmlFor="img-upload" className='AddDoc' style={{ margin: '10px', cursor: 'pointer' }}>Image</label>
          </div>
          <div >
            {/* Button for uploading PDF documents */}
            <input type="file"  id="pdf-upload" accept="application/pdf" style={{ display: 'none' }} onChange ={(e)=>fileUpload(e,'pdf')} />
            <label htmlFor="pdf-upload" className='AddDoc' style={{ margin: '10px', cursor: 'pointer' }}>PDF</label>
          </div>
          <div >
            {/* Button for uploading Word documents */}
            <input type="file" id="word-upload" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style={{ display: 'none' }} onChange ={(e)=>fileUpload(e,'word')}/>
            <label htmlFor="word-upload" className='AddDoc' style={{ margin: '10px', cursor: 'pointer' }}>Word</label>
          </div>
          <div>
            {/* Button for uploading Excel documents */}
            <input type="file"  id="excel-upload" accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" style={{ display: 'none' }} onChange ={(e)=>fileUpload(e,'excel')} />
            <label className='AddDoc' htmlFor="excel-upload" style={{ margin: '10px', cursor: 'pointer' }}>Excel</label>
          </div>
        </div>
      )}
        <button id='sendBtn' className='submit'>
          <IoMdSend/>
        </button>
      </form>
      

    </div>
  )
}

export default Chatinput