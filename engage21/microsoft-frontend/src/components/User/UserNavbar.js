import React from 'react'
import '../../styles/user/usernavbar.css'
import dummyUser from "../../images/user/dummyuser.png"

function UserNavbar() {
    return (
        <div class="userNavbar-main">
            <h2>Microsoft Teams</h2>
            <form className="userNavbar-main-search">
                <input placeholder="Search" type="text"></input>
            </form>
            <div className="userNavbar-main-profile">
                <img src={dummyUser} alt="user"></img>
            </div>
        </div>
    )
}

export default UserNavbar
