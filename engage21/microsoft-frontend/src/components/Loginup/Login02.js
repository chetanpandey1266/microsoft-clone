import React, { useState } from 'react'
import '../../styles/login.css'
import logo from '../../images/navbar/navbar_icon.png'
import axios from 'axios'

function Login02() {

    let [pswrd, setPswrd] = useState();

    const handleSubmit = () => {
        axios.post("http://localhost:5000/signin02", pswrd)
            .then(() => console.log("Suceeded"))
            .catch(err => console.log(err));
    }

    return (
        <div>
           <div className="login">
            <div className="login-main">
                <img src={logo} alt="Microsoft"/>
                <h2>Sign in</h2>
                <form method="POST" onSubmit={() => handleSubmit()} id="login02" className="login-main-email">
                    <input placeholder="Password" name="password" onChange={(data) => setPswrd(data)}/>
                </form>
                <p><span>Forgot Password!</span></p>
                <div className="login-main-button">
                    <button form="login02" type="submit">Sign in</button>
                </div>
            </div>
        </div> 
        </div>
    )
}

export default Login02
