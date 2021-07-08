import React, { useState } from "react";
import "../../styles/signup.css";
import logo from "../../images/navbar/navbar_icon.png";

function Signup01() {
    let [data, setData] = useState({ email: "", name: "" });

    const handleChange = (value, type) => {
        if (type === "email") {
            setData({ ...data, email: value });
        } else if (type === "name") {
            setData({ ...data, name: value });
        }
    };

    return (
        <div className="signup">
            <div className="signup-main">
                <img src={logo} alt="Microsoft" />
                <h2>Enter Details</h2>
                <form
                    id="signup01_form"
                    className="signup-main-email"
                    method="POST"
                    // onSubmit={() => handleSubmit()}
                    action="/api/signup01"
                >
                    <input
                        type="text"
                        placeholder="Name ( minimum 3 characters )"
                        name="name"
                        onChange={(e) => handleChange(e.target.value, "name")}
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="text"
                        placeholder="someone@example.com"
                        name="email"
                        onChange={(e) => handleChange(e.target.value, "email")}
                        required
                    />
                </form>
                <div className="signup-main-button">
                    <button type="submit" form="signup01_form">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup01;
