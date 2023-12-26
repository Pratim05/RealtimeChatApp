import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"

import { Login } from "./pages/Login";

import Register from "./pages/Register";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import ProfileEdit from "./components/ProfileEdit";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/register" element = {<Register/>}/>
    <Route path="/login" element = {<Login/>}/>
    <Route path="/chatroom" element = {<ChatRoom/>}/>
    <Route path="/editprofile" element = {<ProfileEdit/>}/>
    <Route path="/" element = {<Home/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
