import React, { useEffect, useRef, useState } from 'react';
import default_avatar from '../assets/default_avatar.png';
import { FcEditImage } from 'react-icons/fc';
import { BiSearch } from "react-icons/bi";
import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import ProfileEdit from '../components/ProfileEdit';
import Model from 'react-modal';
import { IsreadUpdateRoute, getAllNotificationsRoute, host, } from '../utils/APIRoutes';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io(host);

Model.setAppElement('#root');

function Contacts({ contacts, currentUser, setUpdate, changeChat, notification, setnotification }) {
  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allNotification, setAllNotification] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState({});



  function convertImageUrl(User) {
    let avatarImageUrl = default_avatar;
    if (User.avatarImage.data !== null) {
      const imageDataArray = User.avatarImage.data.data;
      const base64String = btoa(String.fromCharCode(...imageDataArray));
      avatarImageUrl = `data:${User.avatarImage.contentType};base64,${base64String}`;
    }
    return avatarImageUrl;
  }
  function countNotifications(contact) {
    if (allNotification) {
      let count = 0;
      for (let i = 0; i < allNotification.length; i++) {
        if (contact._id === allNotification[i].sender) {
          count += 1;
        }
      } if(count>0)  return count
      return '';
    }
    return '';
  }
  async function updateIsRead(contact) {
  
      try {
        console.log(contact.username)
        const data = await axios.post(IsreadUpdateRoute, {
          from: contact._id,
          to: currentUser._id
        });
        console.log(data)
      } catch (e) {
        console.log("Error in update is read", e);
      }
    
  }

  const CheckNotification = (contact) => {
    if (notification && (notification.sender === contact._id)) {
      return true;
    } else {
      return false;
    }
  };

  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Listen for userStatusChanged event from the server
    socket.on('userStatusChanged', ({ userId, isOnline ,OnlineUsers}) => {
      // Update the onlineUsers state based on the received event
     console.log(OnlineUsers)
      setOnlineUsers(OnlineUsers);
    });
  
    // Clean up the event listener on component unmount
    return () => {
      socket.off('userStatusChanged');
    };
  }, []);



  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(convertImageUrl(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchNotifications() {
      if (currentUser) {
        try {
          const response = await axios.post(getAllNotificationsRoute, {
            reciever: currentUser._id
          });
          setAllNotification(response.data);
          // console.log(response.data);
        } catch (e) {
          console.log("Error in fetching Notifications", e);
        }
      }
    }
    fetchNotifications();
  },[currentUser],[],);

  const changeCurrentChat = (index, contact) => {
    updateIsRead(contact);
    setCurrentSelected(index);
    changeChat(contact);
    if (CheckNotification(contact)) {
       setnotification(null);
    }
    // Mark the contact as selected
    setSelectedContacts(prevState => ({
      ...prevState,
      [contact._id]: true
    }));
  };
 

 

  return (
    <div className="Contacts">
      <Model
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={{
          content: {
            width: '450px',
            height: '550px',
            margin: '0 auto',
          },
        }}
      >
        <ProfileEdit currentUser={currentUser} convertImageUrl={convertImageUrl} setOpenModal={setOpenModal} setUpdate={setUpdate} />
      </Model>
      <div id="user-profile">
        <img src={currentUserImage} height={50} alt="" onClick={() => setUpdate(true)} />
        <h3>{currentUserName}</h3>
        <div className="icon">
          <FcEditImage id="edit" onClick={() => setOpenModal(true)} />
          <BiPowerOff id="logout" onClick={handleLogout} />
        </div>
      </div>
      <div className="search-area">
        <input
          type="text"
          placeholder="Search Contacts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="icon">
          <BiSearch />
        </div>
      </div>
      <div className="allContactsList">
        {filteredContacts.map((contact, index) => (
          <div
            className={`contact ${index === currentSelected ? 'selected' : ''}`}
            key={index}
            onClick={() => {
              changeCurrentChat(index, contact);
            }}
          >
           <div className="contact-avatar">
           <img
              className="contact-profile-img"
              src={convertImageUrl(contact)}
              alt="profile"
              height={30}
            />
         {onlineUsers?.includes(contact._id) &&  <span class="status"></span> }
           </div>
           <div className="name_message">
           <h3 className="contact-name">{contact.username}</h3>
           {/* <p> {onlineUsers?.includes(contact._id) ? 'Online' : 'Offline'}</p> */}
            <p className='curr_notify'>{CheckNotification(contact) && notification.message}</p>
           </div>
           {index !== currentSelected && !selectedContacts[contact._id] && countNotifications(contact) > 0 && (
  <p className='Num-notify'>{countNotifications(contact)}</p>
)}

          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
