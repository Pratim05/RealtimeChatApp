import React, { useState } from 'react'
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
import { SiAddthis } from "react-icons/si";

function Chatinput({handleSendMsg}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg , setMsg] = useState("")


  
const handleEmojipickerHideShow = ()=>{
    setShowEmojiPicker(!showEmojiPicker)
}
const handleEmojiClick = (event , emoji)=>{
 
  let message = msg
  message += event.emoji
  setMsg(message)

}

const sendChat = (event)=>{
  event.preventDefault()
  if(msg.length >0){
    handleSendMsg(msg)
    setMsg("")
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
      <form className='input-container' onSubmit={(e)=>{sendChat(e)}}>
        <input type="text" placeholder='Enter Your Message Here...' value={msg} onChange={(e)=>{setMsg(e.target.value)}}/>
        <button id='AddDoc'>
        <SiAddthis />
        </button>
        <button id='sendBtn' className='submit'>
          <IoMdSend/>
        </button>
      </form>

    </div>
  )
}

export default Chatinput