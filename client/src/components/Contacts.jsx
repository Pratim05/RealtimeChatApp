import React, { useEffect, useState } from 'react';
import default_avatar from '../assets/default_avatar.png';
import { FcEditImage } from 'react-icons/fc';
import { TbUserSearch } from 'react-icons/tb';
import { BiPowerOff } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import ProfileEdit from '../components/ProfileEdit';
import Model from 'react-modal';

Model.setAppElement('#root');

function Contacts({ contacts, currentUser, changeChat }) {
  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  function convertImageUrl(User) {
    let avatarImageUrl = default_avatar;
    if (User.avatarImage.data !== null) {
      const imageDataArray = User.avatarImage.data.data;
      const base64String = btoa(String.fromCharCode(...imageDataArray));
      avatarImageUrl = `data:${User.avatarImage.contentType};base64,${base64String}`;
      return avatarImageUrl;
    } else {
      return avatarImageUrl;
    }
  }

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(convertImageUrl(currentUser));
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <ProfileEdit />
      </Model>
      <div id="user-profile">
        <img src={currentUserImage} height={50} alt="" />
        <h3>{currentUserName}</h3>
        <div className="icon">
          <FcEditImage id="edit" onClick={() => setOpenModal(true)} />
          <BiPowerOff id="logout" onClick={() => handleLogout()} />
        </div>
      </div>
      <div className="search-area">
        <div className="icon">
          <TbUserSearch />
        </div>
        <input
          type="text"
          placeholder="Search Contacts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
            <img
              className="contact-profile-img"
              src={convertImageUrl(contact)}
              alt="profile"
              height={30}
            />
            <h3 className="contact-name">{contact.username}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
