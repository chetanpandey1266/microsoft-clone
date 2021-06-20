import React from 'react'
import '../../styles/user/usermain.css'
import UserMainCalendar from './UserMain/UserMainCalendar'
import UserMainChat from './UserMain/UserMainChat'
import UserMainTeam from './UserMain/UserMainTeam'

const options = [<UserMainChat /> ,<UserMainTeam /> ,<UserMainCalendar />];

function UserMain(props) {
    return (
            <div className="userName-main">
                {options[parseInt(props.status)%3]}
            </div>
    )
}   

export default UserMain
