import React, { useState } from 'react'
import '../../styles/signup.css'
import logo from '../../images/navbar/navbar_icon.png'
import axios from 'axios';


function Signup02(props) {

    let [password, setPassword] = useState();
    const handleSubmit = () => {
        axios.post("http://localhost:5000/signup02", password)
            .then(e => {
                console.log(e)
                console.log("Successfully posted !!")
            })
            .catch(err => console.log(err.message));
    }
    return (
        <div>
           <div className="signup">
            <div className="signup-main">
                <img src={logo} alt="Microsoft"/>
                <h2>Sign Up</h2>
                <form id="signup02" className="signup-main-email" method="post" onSubmit={() => handleSubmit()}>
                    <input type="password" placeholder="Password" name="password" onChange={e => {
                        setPassword(e.target.value)
                    }}/>
                </form>
                <p>Create a password of min 6 characters</p>
                <div className="signup-main-button">
                    <button type="submit" form="signup02">Sign in</button>
                </div>
            </div>
        </div> 
        </div>
    )
}

export default Signup02
