import React from "react";
import "../../styles/user/usermain.css";
import UserMainProfile from "./UserMain/UserMainProfile";
import UserMainChat from "./UserMain/UserMainChat";
import UserMainCall from "./UserMain/UserMainCall";
import UserMainTeam from "./UserMain/UserMainTeam";

function UserMain(props) {
    const options = [
        <UserMainChat socket={props.socket} />,
        <UserMainCall socket={props.socket} />,
        <UserMainTeam socket={props.socket} />,
        <UserMainProfile />,
    ];

    return (
        <div className="userName-main">{options[parseInt(props.status)]}</div>
    );
}

export default UserMain;
