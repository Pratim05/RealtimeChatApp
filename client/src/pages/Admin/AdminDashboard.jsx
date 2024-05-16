import React from 'react'

import { BiSearch } from "react-icons/bi";
import { BiPowerOff } from 'react-icons/bi';
import app_logo from "../../assets/app_logo.png"

function AdminDashboard() {


  return (
    <div className='AdminDashboard'>

      <div className="dashboard-top">
      <div id="nav-text">
          <img src={app_logo} alt="" height={70}  />
          <h2>Swift Talk </h2>
          </div>
        <div className="logout-btn icon">
        <BiPowerOff id="logout"  />
        </div>
      </div>
      <div className="admin-panel">
      <div className="panel-dash-header">
      <div className="icon"></div>
      <div>ADMIN</div>
      <div>mernwebdevelopment@gmail.com</div>
      <div>Organization Name :</div>
      <div>Mobile No</div>
    </div>
        <div className="menu-options">
          <ul>
            <li>Users Manage</li>
            <li>Push Notification</li>
          </ul>
        </div>
        <div className="panel-dash">
    
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard