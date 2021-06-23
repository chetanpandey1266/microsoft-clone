import React, {useState, useEffect} from 'react'
import UserNavbar from './User/UserNavbar.js'
import UserSidebar from './User/UserSidebar.js'
import UserMain from './User/UserMain.js'
import axios from 'axios';

import queryString from 'query-string'
import { useLocation } from 'react-router-dom'


function User() {

    const { search } = useLocation()
    const values = queryString.parse(search)
    console.log(values.token)

    let [logged, setLogged] = useState(false);
    let [user, setUser] = useState("");
    // const [user, setUser] = useState({});
    useEffect(() => {
        axios.get("http://localhost:5000/user", {
            headers: {'x-auth-token': values.token }
        })
        .then(e => {
            // console.log(e.data[0].name);
            setUser(e.data[0].name);
            setLogged(true);
        })
        .catch(err =>{ 
            console.log(err);    
        })
    }, [])
    
    const [active, setActive] = useState(0);
    if(logged){
        return (
            <div>
                <UserNavbar/>
                <UserSidebar name={user} changeActive={setActive}/>
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
