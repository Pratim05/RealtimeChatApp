import React, { useState, useEffect} from 'react'
import './FilesComp.css'
import { PiDownloadSimpleDuotone } from "react-icons/pi";

import docIcon from '../../assets/docIcon.png'
import excelIcon from '../../assets/excelIcon.png'
import pdfIcon from '../../assets/pdfIcon.png'

function convertFileImageUrl (file) {
 try {
  let avatarImageUrl 
  if(file && !file.data){
    const blob = new Blob([file[0]]);
    return URL.createObjectURL(blob);
  }
  if (file && file.data !== null) {
    try {
        
      const imageDataArray = file.data.data;
      // Convert the image data array to a Base64 encoded string
      const base64String = btoa(String.fromCharCode(...imageDataArray));
      // Construct the data URL for Profile Image
      avatarImageUrl = `data:${file.contentType};base64,${base64String}`;
      return avatarImageUrl;
    } catch (error) {
      console.log(error);
    }
  } else {
    // return avatarImageUrl;
  }
 } catch (error) {
  console.log(error)
 }
}

const handleDownload = (file) => {
    // Convert the ArrayBuffer to a Blob
    const blob = new Blob([new Uint8Array(file.data.data)], { type: file.contentType });
    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element
    const link = document.createElement('a');
    // Set the href attribute to the temporary URL
    link.href = url;
    // Set the download attribute to the desired file name
    link.download = file.filename;
    // Append the anchor element to the document body
    document.body.appendChild(link);
    // Trigger a click event on the anchor element
    link.click();
    // Remove the anchor element from the document body
    document.body.removeChild(link);
    // Revoke the temporary URL to free up memory
    window.URL.revokeObjectURL(url);
  };
  const handleBufferDownload = (file, fileType) => {
    const blob = new Blob([file[0]], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
      
    link.href = url;
    link.download = file.filename;
    // Append the anchor element to the document body
    document.body.appendChild(link);
    // Trigger a click event on the anchor element
    link.click();
    // Remove the anchor element from the document body
    document.body.removeChild(link);
    // Revoke the temporary URL to free up memory
    window.URL.revokeObjectURL(url);
  };
  


  
export const DocxFilesComp = ({file}) => {
 
  return (
    <div className="files_container">
    {
        (file && !file.data) ? 
        (<div className="files_box"> <img src={pdfIcon} alt="" />
        <div className="file_name">
       {file?.filename}
        </div>
      <div className="download_icon" onClick={() => handleBufferDownload(file, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')}>        <PiDownloadSimpleDuotone /></div></div>)
        :
        (<div className="files_box">
      <img src={docIcon} alt="" />
      <div className="file_name">
     {file?.filename}
      </div>
      <div className="download_icon" onClick={()=>handleDownload(file)}>
      <PiDownloadSimpleDuotone />
      </div>
    </div>)
      }
  </div>
  )
}
export const ImageFilesComp = ({file}) => {
  return (
    <div className="Imgfiles_container">
      <img src={convertFileImageUrl(file)} alt="" />
      <div className="download_icon">
    </div>
  </div>
  )
}

export const PdfFilesComp = ({file}) => {
  return (
    
    <div className="files_container">
      {
        (file && !file.data) ? 
        (<div className="files_box"> <img src={pdfIcon} alt="" />
        <div className="file_name">
       {file?.filename}
        </div>
        <div className="download_icon" onClick={() => handleBufferDownload(file, 'application/pdf')}>
        <PiDownloadSimpleDuotone /></div></div>)
        :
        (<div className="files_box">
      <img src={pdfIcon} alt="" />
      <div className="file_name">
     {file?.filename}
      </div>
      <div className="download_icon" onClick={()=>handleDownload(file)}>
      <PiDownloadSimpleDuotone />
      </div>
    </div>)
      }
    {/* <div className="files_box">
      <img src={pdfIcon} alt="" />
      <div className="file_name">
     {file?.filename}
      </div>
      <div className="download_icon" onClick={()=>handleDownload(file)}>
      <PiDownloadSimpleDuotone />
      </div>
    </div> */}
  </div>
  )
}

export const TextFilesComp = ({file}) => {
  return (
    <div className="files_container">
    {
        (file && !file.data) ? 
        (<div className="files_box"> <img src={pdfIcon} alt="" />
        <div className="file_name">
       {file?.filename}
        </div>
        <div className="download_icon" onClick={()=>handleBufferDownload(file)}>
        <PiDownloadSimpleDuotone /></div></div>)
        :
        (<div className="files_box">
      <img src= '' alt="" />
      <div className="file_name">
     {file?.filename}
      </div>
      <div className="download_icon" onClick={()=>handleDownload(file)}>
      <PiDownloadSimpleDuotone />
      </div>
    </div>)
      }
  </div>
  )
}

export const ExcelFilesComp = ({file}) => {
  return (
    <div className="files_container">
    {
        (file && !file.data) ? 
        (<div className="files_box"> <img src={pdfIcon} alt="" />
        <div className="file_name">
       {file?.filename}
        </div>
        <div className="download_icon" onClick={() => handleBufferDownload(file, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')}>        <PiDownloadSimpleDuotone /></div></div>)
        :
        (<div className="files_box">
      <img src={excelIcon} alt="" />
      <div className="file_name">
     {file?.filename}
      </div>
      <div className="download_icon" onClick={()=>handleDownload(file)}>
      <PiDownloadSimpleDuotone />
      </div>
    </div>)
      }
  </div>
  )
}
export const AudioFilesComp = ({file}) => {
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setAudioSrc(e.target.result);
    };
    reader.readAsDataURL(new Blob([new Uint8Array(file.data.data)]));
  }, [file]);

  return (
    <div className="files_container">
      {audioSrc && (
        <audio controls>
          { file?.blobURL ? ( <source src={file?.blobURL} type="audio/mpeg" />): (<source src={audioSrc} type="audio/mpeg" />)}      
        </audio>
      )}
     
    </div>
  );
};

export const UnkhownFilesComp = ({file}) => {
  return (
    <div className="files_container">
    <div className="files_box">
      <img src="" alt="" />
      <div className="file_name">
      UnkhownFilesComp
      </div>
      <div className="download_icon">

      </div>
    </div>
  </div>
  )
}



