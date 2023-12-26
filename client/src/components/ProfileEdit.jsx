import React from 'react'
import '../pages/CssFiles/ProfileEdit.css'

function ProfileEdit({currentUser}) {


  return (
    <div id='ProfileEdit'>
        <div className="header">
            <div className="icon"></div>
            <h4>Edit Profile</h4>
            <div className="icon"></div>
        </div>
        <form >
            <div className="inputs">
                <label htmlFor="">Username</label>
                <div className="inputBox">
                    <input type="text" placeholder='Username' />
                    <div className="icon"></div>
                </div>
            </div>
            <div className="inputs">
                <label htmlFor="">Avatar</label>
                <div className="inputBox">
                    <img src="" alt="img"/>
                    <input type="file" />
                </div>
            </div>
            <div className="inputs">
                <label htmlFor="">Phone</label>
                <div className="inputBox">
                    <input type="number" placeholder='91**********' />
                    <div className="icon"></div>
                </div>
            </div>
            <div className="inputs">
                <label htmlFor="">Change Password</label>
                <div className="inputBox">
                    <input type="password" placeholder='Password' />
                    <div className="icon"></div>
                </div>
            </div>
            <div className="inputs">
           
                <label htmlFor="">About</label>
                <textarea name="" id="" cols="30" rows="10" placeholder='About Yourself'></textarea>
            </div>
            <div className="inputs">
           
                <label htmlFor="">Social Links</label>
                <div className="inputBox">
               <input type="url" placeholder='Youtube Channel'/>
               <div className="icon"></div>
                </div>
                <div className="inputBox">
               <input type="url" placeholder='Facebook Profile'/>
               <div className="icon"></div>
                </div>
                <div className="inputBox">
               <input type="url" placeholder='Instagram Profile'/>
               <div className="icon"></div>
                </div>
               
            </div>

            <div className="Button"><input type="submit" value="Save" /></div>

        </form>
    </div>
  )
}

export default ProfileEdit