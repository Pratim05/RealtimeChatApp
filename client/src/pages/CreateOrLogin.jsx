import React, { useState } from 'react';
import SignUp from './CreateOrLogin/SignUp';
import { SignIn } from './CreateOrLogin/SignIn';
import './CssFiles/CreateOrLogin.css';

function CreateOrLogin() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='CreateOrLogin'>
        <div className={`Authcontainer ${isActive ? 'active' : ''}`} id="container">
        <SignUp/>
        <SignIn/>

        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back !</h1>
                    <p>Enter your personal details to use all of Chat features</p>
                    <button className="hidden" id="login" onClick={() => setIsActive(false)}>Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Welcome, To SwiftTalk!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className="hidden" id="register" onClick={() => setIsActive(true)}>Sign Up</button>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default CreateOrLogin;
