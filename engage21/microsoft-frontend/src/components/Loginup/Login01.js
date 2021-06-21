import React, {useState} from 'react'
import '../../styles/login.css'
import logo from '../../images/navbar/navbar_icon.png'
import axios from 'axios'

function Login01() {

    let [email, setEmail] = useState({});
    const handleSubmit = () => {
        console.log(email)
        axios.post("http://localhost:5000/", email)
            .then(() => {
                console.log("Submitted Successfully")
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <div className="login">
            <div className="login-main">
                <img src={logo} alt="Microsoft"/>
                <h2>Sign in</h2>
                <form  method="POST" onSubmit={() => handleSubmit()} id="login01" className="login-main-email">
                    <input placeholder="Email" name="email" onChange={e => { 
                        setEmail(e.target.value)
                    }}/>
                </form>
                <p>No account? <span>Create One!</span></p>
                <div className="login-main-button">
                    <button form="login01" type="submit">Next</button>
                </div>
            </div>
        </div>
    )
}

export default Login01
