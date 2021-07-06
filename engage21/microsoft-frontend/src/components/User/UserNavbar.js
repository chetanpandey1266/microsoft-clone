import React from "react";
import "../../styles/user/usernavbar.css";
import dummyUser from "../../images/user/dummyuser.png";
import { useHistory } from "react-router-dom";

function UserNavbar(props) {
    let history = useHistory();

    function logout() {
        props.socket.disconnect();
        localStorage.clear();
        history.push("/");
    }

    return (
        <div class="userNavbar-main">
            <h2>Microsoft Teams</h2>
            <form className="userNavbar-main-search">
                <input placeholder="Search" type="text"></input>
            </form>
            <div className="userNavbar-main-profile">
                <img src={dummyUser} alt="user"></img>
            </div>
            <button onClick={() => logout()} className="userNavbar-main-logout">
                Logout
            </button>
        </div>
    );
}

export default UserNavbar;
