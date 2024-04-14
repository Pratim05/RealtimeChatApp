import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { SiAddthis } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { IoMdMic } from "react-icons/io";
import { FaRegCircleStop } from "react-icons/fa6";

import { AiFillCloseSquare } from "react-icons/ai";
import Record from "./AudioRecorder/Record";

function Chatinput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const [file, setFile] = useState(undefined);
  const [fileType, setFileType] = useState("");
  const [showUploadButtons, setShowUploadButtons] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [voice, setVoice] = useState(false);
  const [audioData, setAudioData] = useState(null);

  const handleEmojipickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emoji) => {
    setMsg((prevMsg) => prevMsg + event.emoji);
  };

  const fileUpload = async (event, fileType) => {
    try {
      setShowUploadButtons(false);
      setFileType(fileType);
      const files = event.target.files;
      setFile(files);
      const filesLength = files.length;

      if (filesLength > 0 && fileType === "image") {
     
        const imageSrc = URL.createObjectURL(files[0]);
        const imagePreviewElement = document.querySelector("#uploaded-image");
        setImgSrc(imageSrc);
        // imagePreviewElement.src = imageSrc
        // imagePreviewElement.style.display = "block"
        document.querySelector(".hidden-close").style.display = "block";
      } else if (filesLength > 0 && fileType !== "image") {
        document.querySelector(".preview").style.display = "block";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const CancelFileUpload = () => {
    setFile(undefined);
    if (fileType === "image") {
      setFileType("");
      document.querySelector(".hidden-close").style.display = "none";
    } else {
      document.querySelector(".preview").style.display = "none";
    }
  };

  //AUDIO RECORD HANDLE

  const startHandle = () => {
    setFileType("audio");
    setFile("");
    setElapsedTime(0);
    setIsRunning(true);
    setVoice(true);
  };
  const stopHandle = () => {
    setFile(audioData);
    setIsRunning(false);
    setVoice(false);
  };

  const clearHandle = () => {
    setIsRunning(false);
    setVoice(false);
    setAudioData(false);
    setElapsedTime(0);
    setFileType("");
    setFile("");
  };

  const sendChat = (event) => {
    try {
      event.preventDefault();
      setShowEmojiPicker(false);

      if (msg.length > 0 && (!file || !audioData)) {
        handleSendMsg(msg, null, fileType);
        setMsg("");
      } else if ((file || audioData) && msg.length > 0) {
        fileType === "audio"
          ? handleSendMsg(msg, audioData, fileType)
          : handleSendMsg(msg, file, fileType);
        setFile(undefined);
        setMsg("");
        document.querySelector(".preview").style.display = "none";
        if (fileType === "image") {
          setFileType("");
        }
      } else if ((file || audioData) && msg.length === 0) {
        fileType === "audio"
          ? handleSendMsg(null, audioData, fileType)
          : handleSendMsg(null, file, fileType);
        setFile(undefined);
        document.querySelector(".preview").style.display = "none";
        if (fileType === "image") {
          setFileType("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Chatinput">
      <div className="button-conatiner">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojipickerHideShow} />
          {showEmojiPicker && (
            <Picker
              onEmojiClick={handleEmojiClick}
              height={400}
              width={300}
              size={20}
            />
          )}
        </div>
      </div>
      <form
        method="POST"
        className="input-container"
        encType="multipart/form-data"
        onSubmit={(e) => {
          sendChat(e);
        }}
      >
        <input
          type="text"
          placeholder="Enter Your Message Here..."
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />

        <div class="img-view">
          {fileType === "image" ? (
            <img id="uploaded-image" src={imgSrc} height={110} width={110} />
          ) : (
            <div className="preview">
              <p>{file && file[0]?.name}</p>
              <span className="file-close">
                <AiFillCloseSquare
                  size={25}
                  onClick={() => CancelFileUpload()}
                />
              </span>
            </div>
          )}

          <span className="hidden-close">
            <AiFillCloseSquare onClick={() => CancelFileUpload()} />
          </span>
        </div>

        <div className="sendVoice">
          {!voice ? (
            <div onClick={startHandle} className="">
              <IoMdMic />
            </div>
          ) : (
            <div onClick={stopHandle} className="">
              <FaRegCircleStop />
            </div>
          )}
        </div>
        <div className="recordView">
          <Record
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            setAudioData={setAudioData}
            audioData={audioData}
            clearHandle={clearHandle}
            elapsedTime={elapsedTime}
            setElapsedTime={setElapsedTime}
            voice={voice}
          />
        </div>

        <div
          className="AddDoc"
          onClick={() => setShowUploadButtons(!showUploadButtons)}
        >
          {showUploadButtons ? <ImCross /> : <SiAddthis />}
        </div>
        {showUploadButtons && (
          <div className="UploadBtns">
            <div>
              {/* Button for uploading PDF documents */}
              <input
                type="file"
                id="img-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => fileUpload(e, "image")}
              />
              <label
                htmlFor="img-upload"
                className="AddDoc"
                style={{ margin: "10px", cursor: "pointer" }}
              >
                Image
              </label>
            </div>
            <div>
              {/* Button for uploading PDF documents */}
              <input
                type="file"
                id="pdf-upload"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={(e) => fileUpload(e, "pdf")}
              />
              <label
                htmlFor="pdf-upload"
                className="AddDoc"
                style={{ margin: "10px", cursor: "pointer" }}
              >
                PDF
              </label>
            </div>
            <div>
              {/* Button for uploading Word documents */}
              <input
                type="file"
                id="word-upload"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                style={{ display: "none" }}
                onChange={(e) => fileUpload(e, "word")}
              />
              <label
                htmlFor="word-upload"
                className="AddDoc"
                style={{ margin: "10px", cursor: "pointer" }}
              >
                Word
              </label>
            </div>
            <div>
              {/* Button for uploading Excel documents */}
              <input
                type="file"
                id="excel-upload"
                accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                style={{ display: "none" }}
                onChange={(e) => fileUpload(e, "excel")}
              />
              <label
                className="AddDoc"
                htmlFor="excel-upload"
                style={{ margin: "10px", cursor: "pointer" }}
              >
                Excel
              </label>
            </div>
          </div>
        )}
        <button id="sendBtn" className="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default Chatinput;
