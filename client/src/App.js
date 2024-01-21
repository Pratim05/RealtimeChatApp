import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { ToastContainer } from "react-toastify";

import { Login } from "./pages/Login";

import Register from "./pages/Register";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import ProfileEdit from "./components/ProfileEdit";
import ResetPass from "./components/ResetPass";
import EmailOtpVerification from "./components/EmailOtpVerification";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/register" element = {<Register/>}/>
    {/* <Route path="/emailotpverify" element = {<EmailOtpVerification/>}/> */}
    <Route path="/login" element = {<Login/>}/>
    <Route path="/chatroom" element = {<ChatRoom/>}/>
    <Route path="/editprofile" element = {<ProfileEdit/>}/>
    <Route path="/resetpass/:id/:token" element = {<ResetPass/>}/>
    <Route path="/" element = {<Home/>}/>
    </Routes>
    <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
