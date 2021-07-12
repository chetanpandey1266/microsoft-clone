import React from "react";
import "../../styles/user/usersidebar.css";

function UserSidebar(props) {
    return (
        <div className="userSidebar-main">
            <h2>{props.name}</h2>
            <div
                className="userSidebar-main-profile"
                onClick={() => props.changeActive(0)}
            >
                <h5>Profile</h5>
            </div>
            <div
                className="userSidebar-main-chats"
                onClick={() => props.changeActive(1)}
            >
                <h5>Chat</h5>
            </div>
            <div
                className="userSidebar-main-team"
                onClick={() => props.changeActive(2)}
            >
                <h5>Teams</h5>
            </div>
        </div>
    );
}

export default UserSidebar;
