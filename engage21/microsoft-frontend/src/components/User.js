import React, {useState} from 'react'
import UserNavbar from './User/UserNavbar.js'
import UserSidebar from './User/UserSidebar.js'
import UserMain from './User/UserMain.js'

function User() {

    const [active, setActive] = useState(0);
    
    return (
        <div>
            <UserNavbar/>
            <UserSidebar name="User Name" changeActive={setActive}/>
            <UserMain status={active}/>
        </div>
    )
}

export default User
