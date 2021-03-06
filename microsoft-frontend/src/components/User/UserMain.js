import React from "react";
import "../../styles/user/usermain.css";
import UserMainProfile from "./UserMain/UserMainProfile";
import UserMainChat from "./UserMain/UserMainChat";
import UserMainTeam from "./UserMain/UserMainTeam";

function UserMain(props) {
    const options = [
        <UserMainProfile />,
        <UserMainChat socket={props.socket} />,
        <UserMainTeam socket={props.socket} />,
    ];

    return (
        <div className="userName-main">{options[parseInt(props.status)]}</div>
    );
}

export default UserMain;
