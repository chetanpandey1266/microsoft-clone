import React, { useState, useEffect } from "react";
import UserNavbar from "./User/UserNavbar.js";
import UserSidebar from "./User/UserSidebar.js";
import UserMain from "./User/UserMain.js";
import axios from "axios";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000/", {
    autoConnect: false,
    path: "/user",
});

function User() {
    const { search } = useLocation();
    const values = queryString.parse(search);

    let [logged, setLogged] = useState(false);
    let [user, setUser] = useState("");

    useEffect(() => {
        // if (!localStorage.getItem("token")) {
        axios
            .get("http://localhost:5000/user", {
                headers: { "x-auth-token": values.token },
            })
            .then((e) => {
                console.log(e);
                localStorage.setItem("token", values.token);
                socket.on("me", (id) => {
                    localStorage.setItem("socket", id);
                    console.log(id);
                });
                socket.connect("http://localhost:5000/user");
                console.log(Date.now());
                setLogged(true);
                localStorage.setItem("name", e.data[0].name);
                setUser(e.data[0].name);
            })
            .catch((err) => {
                console.log(err);
            });
        socket.on("me", (id) => {
            localStorage.setItem("socket", id);
            console.log(id);
        });
        socket.connect("http://localhost:5000/user");
        // }
        // else setLogged(true);
    }, [values.token]);

    const [active, setActive] = useState(0);
    if (logged) {
        return (
            <div>
                <UserNavbar />
                <UserSidebar
                    name={localStorage.getItem("name")}
                    changeActive={setActive}
                />
                <UserMain socket={socket} status={active} />
            </div>
        );
    }
    return <div>Login Details May be Wrong</div>;
}

export default User;
