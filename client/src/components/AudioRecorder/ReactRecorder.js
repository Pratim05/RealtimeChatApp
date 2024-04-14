import React from 'react';
import AudioTimer from './AudioTimer';
import { ReactMic } from 'react-mic';

const ReactRecorder = () => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const [voice, setVoice] = React.useState(false);
    const [recordBlobLink, setRecordBlobLink] = React.useState(null);


    const onStop = (recordedBlob) => {
        setRecordBlobLink(recordedBlob.blobURL);
        setIsRunning(false)
    };

    const startHandle = () => {
        setElapsedTime(0)
        setIsRunning(true)
        setVoice(true)
    }
    const stopHandle = () => {
        setIsRunning(false)
        setVoice(false)
    }

    const clearHandle = () => {
        setIsRunning(false)
        setVoice(false)
        setRecordBlobLink(false)
        setElapsedTime(0)
    }

    return (
        <div>
            <div className="">
              
                <AudioTimer isRunning={isRunning}
                    elapsedTime={elapsedTime}
                    setElapsedTime={setElapsedTime} />
               <ReactMic
                    record={voice}
                    className="sound-wave"
                    onStop={onStop}
                    strokeColor="#000000"
                // backgroundColor="#FF4081"
                />
                <div className="">
                    {recordBlobLink ? <button onClick={clearHandle} className=""> Clear </button> : ""}
                </div>
                <div className=" ">
                    {!voice ? <button onClick={startHandle} className="">Start</button> : <button onClick={stopHandle} className="">Stop</button>}
                </div>
                <div className="">
                    {recordBlobLink ? <audio controls src={recordBlobLink} className="" /> : ""}

                </div>
            </div>
        </div>
    );
};

export default ReactRecorder;