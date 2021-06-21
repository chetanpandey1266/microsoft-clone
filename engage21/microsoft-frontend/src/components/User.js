import React, {useState, useEffect} from 'react'
import UserNavbar from './User/UserNavbar.js'
import UserSidebar from './User/UserSidebar.js'
import UserMain from './User/UserMain.js'
import axios from 'axios';




function User(props) {

    let [logged, setLogged] = useState(false);
    // const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/user")
        .then(e => {
            console.log(e);
            setLogged(true);
        })
        .catch(err =>{ 
            console.error(err)
            debugger;
        })
    }, [])
    
    const [active, setActive] = useState(0);
    if(logged){
        return (
            <div>
                <UserNavbar/>
                <UserSidebar name={logged} changeActive={setActive}/>
                <UserMain status={active}/>
            </div>
        )
    }
    return (
        <div>
            Login Details May be Wrong
        </div>
    )
    
}

export default User
