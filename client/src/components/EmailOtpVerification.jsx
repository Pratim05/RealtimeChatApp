import React from 'react'
import app_logo from "../assets/app_logo.png"
import { Link } from 'react-router-dom';

function EmailOtpVerification() {
  return (
    <div className="Login">
    <div className="brand">
      <img src={app_logo} alt="SwiftTalk" height={70} />
    </div>
    <form
    //   onSubmit={(event) => {
    //     handleSubmit(event);
    //   }}
    >
      <div className="input-boxes">
        <div className="input-box">
          <input type="number" placeholder='Enter 4 Digit OTP' />
        </div>
       
      </div>
      <div className="mid-line">
          <button className="form-btn" type="submit">
            Verify
          </button>
        </div>
    </form>
    <Link className="option-btn" to="/register">
     Go Back
    </Link>
    
  </div>
  )
}

export default EmailOtpVerification