import React, { useState } from "react";
import "../../styles/signup.css";
import logo from "../../images/navbar/navbar_icon.png";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

function Signup02(props) {
    let [password, setPassword] = useState();

    const { search } = useLocation();
    const qs = queryString.parse(search);

    return (
        <div>
            <div className="signup">
                <div className="signup-main">
                    <img src={logo} alt="Microsoft" />
                    <h2>Sign Up</h2>
                    <form
                        id="signup02"
                        className="signup-main-email"
                        method="post"
                        // onSubmit={() => handleSubmit()}
                        action={`/api/signup02?name=${qs.name}&email=${qs.email}`}
                    >
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </form>
                    <p>Create a password of min 6 characters</p>
                    <div className="signup-main-button">
                        <button type="submit" form="signup02">
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup02;
