import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { ToastContainer } from "react-toastify";

import { Login } from "./pages/Login";

import Register from "./pages/Register";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import ProfileEdit from "./components/ProfileEdit";
import ResetPass from "./components/ResetPass";
import ContactInfo from "./components/ContactInfo";
import CreateOrLogin from "./pages/CreateOrLogin";
import ReactRecorder from "./components/AudioRecorder/ReactRecorder";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UsersManage from "./pages/Admin/UsersManage";
import AdminLogin from "./pages/Admin/AdminLogin";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/dashboard" element = {<AdminDashboard/>}/>
    <Route path="/dashboard/usersmanage" element = {<UsersManage/>}/>
    <Route path="/createorlogin" element = {<CreateOrLogin/>}/>
    <Route path="/register" element = {<Register/>}/>
    <Route path="/contactinfo" element = {<ContactInfo/>}/>
    <Route path="/login" element = {<Login/>}/>
    <Route path="/adminlogin" element = {<AdminLogin/>}/>
    <Route path="/chatroom" element = {<ChatRoom/>}/>
    <Route path="/editprofile" element = {<ProfileEdit/>}/>
    <Route path="/resetpass/:id/:token" element = {<ResetPass/>}/>
    <Route path="/audiorecord" element = {<ReactRecorder/>}/>
    <Route path="/" element = {<Home/>}/>
    </Routes>
    <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
