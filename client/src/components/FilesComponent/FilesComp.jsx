import React from 'react'
import './FilesComp.css'

function convertFileImageUrl (file) {
  let avatarImageUrl 
  console.log('in convertion',file)
  if(file && !file.data){
    return URL.createObjectURL(file[0])
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
}

export const DocxFilesComp = ({file}) => {
  return (
    <div className="files_container">
    <div className="files_box">
      <img src="" alt="" />
      <div className="file_name">
      DocxFilesComp
      </div>
      <div className="download_icon">

      </div>
    </div>
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
    <div className="files_box">
      <img src="" alt="" />
      <div className="file_name">
      PdfFilesComp
      </div>
      <div className="download_icon">

      </div>
    </div>
  </div>
  )
}

export const TextFilesComp = ({file}) => {
  return (
    <div className="files_container">
    <div className="files_box">
      <img src="" alt="" />
      <div className="file_name">
      TextFilesComp
      </div>
      <div className="download_icon">

      </div>
    </div>
  </div>
  )
}
export const ExcelFilesComp = ({file}) => {
  return (
    <div className="files_container">
    <div className="files_box">
      <img src="" alt="" />
      <div className="file_name">
      ExcelFilesComp
      </div>
      <div className="download_icon">

      </div>
    </div>
  </div>
  )
}
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



