import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../pages/CssFiles/ProfileEdit.css";
import { FaUser } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { editprofileRoute } from "../utils/APIRoutes";
import { Link } from "react-router-dom";

function ProfileEdit({ currentUser, convertImageUrl , setOpenModal,setUpdate }) {
  const [UpdatedUserData, setUpdatedUserData] = useState({
    userId: currentUser._id,
    username: currentUser.username,
    phoneNumber: currentUser.phoneNumber,
    about: currentUser.about,
    facebookUrl: currentUser.socialLinks.facebookUrl,
    youtubeUrl: currentUser.socialLinks.youtubeUrl,
    instagramUrl: currentUser.socialLinks.instagramUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
      setUpdatedUserData({ ...UpdatedUserData, [name]: value });
  };

  const [avatarImage, setAvatarImage] = useState(null);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 7000,
    draggable: true,
    pauseOnHover: true,
  };

useEffect(()=>{

})
  const handeValidation = () => {
    try {
      const { username, phoneNumber } = UpdatedUserData;

      if (!username || username.length < 3) {
        toast.error(
          "Username Should be greater than 3 characters",
          toastOptions
        );
        console.log("Username Should be greater than 3 characters");
        return false;
      } else if (phoneNumber.length !== 0 && phoneNumber.length !== 10) {
        toast.error("Phone Number Should Contain 10 Digits", toastOptions);
        console.log("Phone Number Should Contain 10 Digits");
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(handeValidation(), UpdatedUserData);
      if (handeValidation()) {
        const { userId, username, phoneNumber, about, facebookUrl,youtubeUrl,instagramUrl } =
          UpdatedUserData;
       
        const response = await axios.post(
          editprofileRoute,
          {
            userId,
            username,
            phoneNumber,
            about,
            facebookUrl,
            youtubeUrl,
            instagramUrl,
            avatarImage,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("response", response.data);
        if (response.data.status === false) {
          toast.error(response.data.msg, toastOptions);
        }

        if (response.data.status === true) {
          localStorage.clear();
          localStorage.setItem(
            "chat-app-user",
            JSON.stringify(response.data.user)
          );
          toast.success(response.data.msg, toastOptions);
        }
        setOpenModal(false)
        setUpdate(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="ProfileEdit">
      <div className="header">
        <div className="icon"></div>
        <h4>Edit Profile</h4>
        <div className="icon"></div>
      </div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        enctype="multipart/form-data"
      >
        <div className="inputs">
          <label htmlFor="">Avatar</label>
          <div className="inputBox ">
            <img id="profileImg" src={convertImageUrl(currentUser)} alt="img" />
            <input
              type="file"
              name="avatarImage"
              accept="image/*"
              onChange={(e) => {
                setAvatarImage(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div className="inputs">
          <label htmlFor="">Username</label>
          <div className="inputBox">
            <input
              type="text"
              name="username"
              placeholder="Username"
              defaultValue={currentUser.username}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <div className="icon">
              <FaUser />
            </div>
          </div>
        </div>
        <div className="inputs">
          <label htmlFor="">Email</label>
          <div className="inputBox">
            <input type="text" placeholder={currentUser.email} disabled />
            <div className="icon">
              <MdMarkEmailRead/>
            </div>
          </div>
        </div>

        <div className="inputs">
          <label htmlFor="">Phone</label>
          <div className="inputBox">
            <input
              type="number"
              name="phoneNumber"
              placeholder="91**********"
              defaultValue={currentUser.phoneNumber}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <div className="icon">
              <FaPhone />
            </div>
          </div>
        </div>

        <div className="inputs">
          <label htmlFor="">About</label>
          <textarea
            id=""
            cols="45"
            rows="10"
            name="about"
            placeholder="About Yourself"
            defaultValue={currentUser.about}
            onChange={(e) => {
              handleChange(e);
            }}
          ></textarea>
        </div>
        <div className="inputs">
          <label htmlFor="">Social Links</label>
          <div className="inputBox">
            <input
              type="url"
              name="youtubeUrl"
              placeholder="Youtube Channel"
              defaultValue={currentUser.socialLinks.youtubeUrl}
              onChange={(e) => {
                handleChange(e);
              }}
            />
           <Link to={UpdatedUserData.youtubeUrl} target="_blank" className="icon">
              <BsYoutube />
            </Link>
          </div>
          <div className="inputBox">
            <input
              type="url"
              placeholder="Facebook Profile"
              name="facebookUrl"
               defaultValue={currentUser.socialLinks.facebookUrl}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Link to={UpdatedUserData.facebookUrl} target="_blank" className="icon">
              <FaFacebook />
            </Link>
          </div>
          <div className="inputBox">
            <input
              type="url"
              placeholder="Instagram Profile"
              name="instagramUrl"
              defaultValue={currentUser.socialLinks.instagramUrl}
              onChange={(e) => {
              handleChange(e);
              }}
            />
           <Link to={UpdatedUserData.instagramUrl} target="_blank" className="icon">
              <AiFillInstagram />
            </Link>
          </div>
        </div>

        <div className="Button">
          <input className="form-btn" type="submit" value="Apply" />
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
