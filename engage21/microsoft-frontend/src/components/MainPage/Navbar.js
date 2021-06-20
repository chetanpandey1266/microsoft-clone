import React from 'react'
import navbar_icon from '../../images/navbar/navbar_icon.png'
import '../../styles/navbar.css'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div className="navbar-main">
            <div className="navbar-icon">
                <img src={navbar_icon} alt="microsoft"/>
            </div>
            <div className="navbar-item">
                
            </div>
            <div className="navbar-loginup">
                <Link to="/signup01" style={{textDecoration:"none"}}><div className="navbar-logup">Sign up for free</div></Link>
                <Link to="/signin01" style={{textDecoration:"none", color:"#000"}}><div className="navbar-login">Sign in<img src="" alt=""/></div></Link>
            </div>
        </div>
    )
}

export default Navbar
