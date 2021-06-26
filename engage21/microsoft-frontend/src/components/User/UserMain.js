import React from 'react'
import '../../styles/user/usermain.css'
import UserMainCalendar from './UserMain/UserMainCalendar'
import UserMainChat from './UserMain/UserMainChat'
import UserMainTeam from './UserMain/UserMainTeam'


function UserMain(props) {

    const options = [<UserMainChat /> ,<UserMainTeam socket_id={props.socket_id} socket={props.socket}/> ,<UserMainCalendar />];

    return (
            <div className="userName-main">
                {options[parseInt(props.status)]}
            </div>
    )
}   

export default UserMain
