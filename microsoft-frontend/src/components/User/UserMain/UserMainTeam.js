import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { v1 as uuid } from "uuid";
import axios from "axios";

function Video(props) {
    const ref = useRef();
    console.log(props.peer, props.key);

    useEffect(() => {
        props.peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
        });
    }, []);

    return (
        <video
            playsInline
            muted
            ref={ref}
            autoPlay
            style={{ width: "250px" }}
        />
    );
}

function Room(props) {
    const [dummyID, setdummyID] = useState("");
    const setroomID = props.setRoomID;

    function create() {
        const id = uuid();
        setroomID(id);
    }

    return (
        <div>
            <div className="userName-main-call-input">
                <input
                    type="text"
                    placeholder="roomId"
                    onChange={(e) => setdummyID(e.target.value)}
                />
                <button
                    style={{ width: "10rem" }}
                    onClick={() => setroomID(dummyID)}
                >
                    Join Room
                </button>
            </div>
            <button style={{ width: "10rem" }} onClick={create}>
                Create Room
            </button>
        </div>
    );
}

function UserMainTeam(props) {
    const socket = props.socket;

    const [stream, setStream] = useState();
    const [peers, setPeers] = useState([]);
    const [roomID, setroomID] = useState("");
    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true);
    const [val, setVal] = useState(true);
    const [email, setEmail] = useState("");
    const peersRef = useRef([]);

    const userVideo = useRef();

    useEffect(() => {
        if (!(roomID === "") && val) {
            socket.connect("https://localhost:5000/user");
            console.log("one timer", roomID, val);
            setVal(false);
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setStream(stream);
                    userVideo.current.srcObject = stream;
                    socket.emit("join room");
                    socket.on("all users", (users) => {
                        const Peers = []; // this is just for knowing that how much videos to render
                        users.forEach((userId) => {
                            const peer = new createPeer(
                                userId,
                                socket.id,
                                stream
                            );
                            peersRef.current.push({
                                peerID: userId,
                                peer,
                            });
                            Peers.push({
                                peerID: userId,
                                peer,
                            });
                        });
                        setPeers(Peers);
                    });

                    socket.on("user joined", (payload) => {
                        const peer = addPeer(
                            payload.signal,
                            payload.callerID,
                            stream
                        );
                        peersRef.current.push({
                            peerID: payload.callerID,
                            peer,
                        });

                        const peerObj = {
                            peer,
                            peerID: peer.callerID,
                        };

                        setPeers((users) => [...users, peerObj]);
                    });

                    socket.on("receiving returned signal", (payload) => {
                        const item = peersRef.current.find(
                            (p) => p.peerID === payload.id
                        );
                        item.peer.signal(payload.signal);
                    });

                    socket.on("user left", (id) => {
                        const peerObj = peersRef.current.find(
                            (p) => p.peerID === id
                        );
                        if (peerObj) {
                            peerObj.peer.destroy();
                        }
                        const peers = peersRef.current.filter(
                            (p) => p.peerID !== id
                        );
                        peersRef.current = peers;
                        setPeers(peers);
                    });
                });
        }
    }, [roomID]);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", (signal) => {
            socket.emit("sending signal", {
                userToSignal,
                callerID,
                signal,
            });
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socket.emit("returning signal", { signal, callerID });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    const toggleVideo = () => {
        if (video) {
            userVideo.current.pause();
        } else {
            userVideo.current.play();
        }
        setVideo(!video);
    };

    const toggleAudio = () => {
        if (audio) {
            userVideo.current.muted = true;
        } else {
            userVideo.current.muted = false;
        }
        setAudio(!audio);
    };

    const endCall = () => {};

    const sendEmail = () => {
        axios
            .post("http://localhost:5000/email", {
                senderEmail: localStorage.getItem("email"),
                email: email,
                roomID: roomID,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <div className="userName-main-team">
            {roomID === "" ? (
                <Room setRoomID={setroomID} />
            ) : (
                <div className="userName-main-team-videoContainer">
                    <h2>RoomID : {roomID}</h2>
                    <button
                        style={{ width: "8rem" }}
                        onClick={() => {
                            navigator.clipboard.writeText(roomID);
                        }}
                    >{`Copy RoomID`}</button>
                    <input
                        placeholder="email to send invite "
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={() => sendEmail()}>Send Invite</button>
                    <div className="userName-main-team-videos">
                        <div className="userName-main-team-myvideo">
                            {stream && (
                                <video
                                    playsInline
                                    ref={userVideo}
                                    autoPlay
                                    style={{ width: "250px" }}
                                />
                            )}
                            <div className="userName-main-team-myvideo-btn">
                                <button onClick={toggleVideo}>
                                    <img src="https://img.icons8.com/material-outlined/24/000000/video.png" />
                                </button>
                                <button onClick={toggleAudio}>
                                    <img src="https://img.icons8.com/ios/24/000000/high-volume--v2.png" />
                                </button>
                                <button
                                    onClick={() => window.location.reload()}
                                    style={{ backgroundColor: "#E44B35" }}
                                >
                                    <img src="https://img.icons8.com/ios/24/000000/end-call.png" />
                                </button>
                            </div>
                        </div>
                        {peers.map((peer) => {
                            return (
                                <div className="userName-main-team-uservideo">
                                    <Video peer={peer.peer} key={peer.peerID} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMainTeam;
