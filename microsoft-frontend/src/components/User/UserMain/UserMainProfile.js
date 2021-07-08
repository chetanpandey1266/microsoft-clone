import React, { useEffect, useState } from "react";
import axios from "axios";

function UserMainProfile(props) {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        setUserEmail(localStorage.getItem("email"));
        setUserName(localStorage.getItem("name"));
    }, []);

    console.log(userName, userEmail);

    const email = localStorage.getItem("email");

    function userUpdate() {
        // debugger;
        axios
            .put("http://localhost:5000/profile", {
                email,
                userName,
                userEmail,
            })
            .then((e) => {
                localStorage.setItem("name", userName);
                localStorage.setItem("email", userEmail);
                console.log(e);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <div className="userName-main-profile">
            <div className="userName-main-profile-form">
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    spellCheck="false"
                />
                <input
                    type="text"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    spellCheck="false"
                />
                <button onClick={() => userUpdate()}>Save</button>
            </div>
        </div>
    );
}

export default UserMainProfile;
