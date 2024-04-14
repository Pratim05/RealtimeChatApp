import React from 'react'
import './Recorder.css'
import AudioTimer from './AudioTimer'
import { ReactMic } from 'react-mic'
import { AiFillDelete } from "react-icons/ai";


function Record({isRunning, setIsRunning, voice,  clearHandle, elapsedTime, setElapsedTime, setAudioData, audioData  }) {
  // Function to convert Blob to ArrayBuffer
  const blobToArrayBuffer = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
};

    const onStop = async (recordedBlob) => {
        const bufferData = await blobToArrayBuffer(recordedBlob.blob);
        setAudioData({
            blobURL: recordedBlob.blobURL,
            data: bufferData,
            mimeType: recordedBlob.options.mimeType,
            startTime: recordedBlob.startTime,
            stopTime: recordedBlob.stopTime,
            audioBitsPerSecond: recordedBlob.options.audioBitsPerSecond
        });
      }
    
  return (
    <div>
        {isRunning && ( <AudioTimer
           isRunning={isRunning}
                    elapsedTime={elapsedTime}
                    setElapsedTime={setElapsedTime} />)}
               <ReactMic
                    record={voice}
                    className="sound-wave"
                    onStop={onStop}
                    strokeColor="#000000"
                // backgroundColor="#FF4081"
                />
                {audioData ? <audio controls src={audioData.blobURL} className="" /> : ""}
                {audioData ? <button onClick={clearHandle} className="audio-del"> <AiFillDelete /> </button> : ""}
    </div>
  )
}

export default Record