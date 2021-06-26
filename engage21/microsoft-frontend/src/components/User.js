import React, {useState, useEffect} from 'react'
import UserNavbar from './User/UserNavbar.js'
import UserSidebar from './User/UserSidebar.js'
import UserMain from './User/UserMain.js'
import axios from 'axios';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:5000/", {
    autoConnect: false, 
    path:"/user",
})


function User() {

    const { search } = useLocation()
    const values = queryString.parse(search)
    console.log(values.token)

    const [me, setMe] = useState("");
    let [logged, setLogged] = useState(false);
    let [user, setUser] = useState("");
    // const [user, setUser] = useState({});
    useEffect(() => {
        if(!localStorage.getItem('token')){
            axios.get("http://localhost:5000/user", {
                headers: {'x-auth-token': values.token }
            })
            .then(e => {
                console.log(e);
                localStorage.setItem('token', values.token)
                socket.on("me", (id) => {
                    setMe(id);
                    console.log(id)
                })
                socket.connect();
                console.log(Date.now());
                setLogged(true)
                setUser(e.data[0].name);
            })
            .catch(err =>{ 
                console.log(err);    
            })
        }else setLogged(true)
    }, [])

    console.log(localStorage.getItem('token'), socket.id)
    
    const [active, setActive] = useState(0);
    if(logged){
        return (
            <div>
                <UserNavbar/>
                <UserSidebar name={user} changeActive={setActive}/>
                <UserMain socket_id={me} socket={socket} status={active}/>
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
