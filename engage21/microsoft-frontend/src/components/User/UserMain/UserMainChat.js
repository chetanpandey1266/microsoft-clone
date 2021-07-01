import React from 'react'
import '../../../styles/user/usermain.css'

function UserMainChat() {
    return (
        <div className="userName-main-chat">
            <header className="userName-main-chat-header">
                <h1>ChatRoom</h1>
            </header>
            <div className="userName-main-chat-body">
                <div className="userName-main-chat-sidebar">
                    <h3><i className="fas fa-users"></i> Users</h3>
                    <ul id="users"></ul>
                </div>
                <div className="userName-main-chat-mainside">
                    <div className="userName-main-chat-messages"></div>
                    <form className="userName-main-chat-form">
                        <input
                            id="msg"
                            type="text"
                            placeholder="Enter Message"
                            required
                            autocomplete="off"
                        />
                        <button className="userName-main-chat-btn"> Send</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default UserMainChat
