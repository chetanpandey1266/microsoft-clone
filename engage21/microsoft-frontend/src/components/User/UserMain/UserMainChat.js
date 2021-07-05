import React, { useState, useEffect } from "react";
import "../../../styles/user/usermain.css";
import ScrollToBottom from "react-scroll-to-bottom";

const Messages = ({ messages, name }) => {
    return (
        <ScrollToBottom className="messages">
            {messages.map((message, i) => (
                <div key={i}>
                    <Message message={message} name={name} />
                </div>
            ))}
        </ScrollToBottom>
    );
};

const Message = ({ message: { user, msg }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return isSentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{trimmedName}</p>
            <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">
                    {/* {ReactEmoji.emojify(msg)} */}
                    {msg}
                </p>
            </div>
        </div>
    ) : (
        <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
                <p className="messageText colorDark">
                    {/* {ReactEmoji.emojify(msg)} */}
                    {msg}
                </p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
        </div>
    );
};

function UserMainChat(props) {
    const socket = props.socket;
    console.log(socket);

    const [room, setRoom] = useState("");
    const [dummyID, setdummyID] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [roomName, setRoomName] = useState("");

    const name = localStorage.getItem("name");

    useEffect(() => {
        if (room !== "") socket.emit("joinRoom", { name, room }, () => {});
    }, [room]);

    const joinRoom = (id) => {
        setRoom(id);
    };

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit("sendMsg", message, () => {
                setMessage("");
            });
        }
    };

    console.log(messages);

    return (
        <div className="userName-main-chat">
            {room === "" ? (
                <div className="userName-main-chat-roomForm">
                    <input
                        type="text"
                        placeholder="roomName"
                        onChange={(e) => setdummyID(e.target.value)}
                    />
                    <button onClick={() => joinRoom(dummyID)}>Join Room</button>
                    {/* <button>Create Room</button> */}
                </div>
            ) : (
                <div className="userName-main-chat-room">
                    <header className="userName-main-chat-header">
                        <h1>{room}</h1>
                    </header>
                    <div className="userName-main-chat-body">
                        <div className="userName-main-chat-mainside">
                            {/* <div className="userName-main-chat-messages"> */}
                            <Messages messages={messages} name={name} />
                            {/* </div> */}
                            <form className="userName-main-chat-form">
                                <input
                                    id="msg"
                                    type="text"
                                    placeholder=" Enter Message"
                                    required
                                    value={message}
                                    onChange={(event) =>
                                        setMessage(event.target.value)
                                    }
                                    onKeyPress={(event) =>
                                        event.key === "Enter"
                                            ? sendMessage(event)
                                            : null
                                    }
                                    autocomplete="off"
                                />
                                <div
                                    className="userName-main-chat-form-btn"
                                    onClick={(e) => sendMessage(e)}
                                >
                                    <img src="https://img.icons8.com/fluent/30/000000/filled-sent.png" />{" "}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMainChat;
