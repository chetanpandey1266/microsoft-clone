import React, { useState, useEffect } from "react";
import UserNavbar from "./User/UserNavbar.js";
import UserSidebar from "./User/UserSidebar.js";
import UserMain from "./User/UserMain.js";
import axios from "../Axios";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect(process.env.BASE_URL, {
    autoConnect: false,
    path: "/user",
});

function User() {
    const { search } = useLocation();
    const values = queryString.parse(search);

    let [logged, setLogged] = useState(false);
    let [user, setUser] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        axios
            .post("/user", { token: values.token })
            .then((e) => {
                console.log(e.data);
                localStorage.setItem("token", values.token);
                socket.on("me", (id) => {
                    localStorage.setItem("socket", id);
                    console.log(id);
                });
                const Msg = {};
                if (!localStorage.getItem("user_msgs")) {
                    localStorage.setItem("user_msgs", JSON.stringify(Msg));
                }
                console.log(Date.now());
                setLogged(true);
                console.log(e.data[0]);
                localStorage.setItem("name", e.data[0].name);
                localStorage.setItem("email", e.data[0].email);
            })
            .catch((err) => {
                console.log(err);
            });
        socket.on("me", (id) => {
            localStorage.setItem("socket", id);
            console.log(id);
        });
        socket.connect("/user");
    }, [values.token]);

    const [active, setActive] = useState(0);
    if (logged) {
        return (
            <div>
                <UserNavbar socket={socket} />
                <UserSidebar
                    name={localStorage.getItem("name")}
                    changeActive={setActive}
                />
                <UserMain socket={socket} status={active} />
            </div>
        );
    }
    return <div></div>;
}

export default User;
