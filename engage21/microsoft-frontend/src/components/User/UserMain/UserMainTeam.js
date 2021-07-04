import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { v1 as uuid } from "uuid";

function Video(props) {
    const ref = useRef();
    console.log(props.peer, props.key);

    useEffect(() => {
        props.peer.on("stream", (stream) => {
            console.log(stream);
            ref.current.srcObject = stream;
        });
    }, []);

    return (
        <video
            playsInline
            muted
            ref={ref}
            autoPlay
            style={{ width: "300px" }}
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
                <button onClick={() => setroomID(dummyID)}>Join Room</button>
            </div>
            <button onClick={create}>Create Room</button>
        </div>
    );
}

function UserMainTeam(props) {
    const socket = props.socket;

    const me = localStorage.getItem("socket");
    const [stream, setStream] = useState();
    const [peers, setPeers] = useState([]);
    const [roomID, setroomID] = useState("");
    const [val, setVal] = useState(true);
    const peersRef = useRef([]);

    const userVideo = useRef();

    useEffect(() => {
        console.log(roomID);
        if (!(roomID === "") && val) {
            socket.connect("https://localhost:500/user");
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
                            Peers.push(peer);
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

                        setPeers((users) => [...users, peer]);
                    });

                    socket.on("receiving returned signal", (payload) => {
                        const item = peersRef.current.find(
                            (p) => p.peerID === payload.id
                        );
                        item.peer.signal(payload.signal);
                    });
                    console.log("peers", peers);
                    console.log(peersRef);
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

    // createRoom

    return (
        <div className="userName-main-team">
            {roomID === "" ? (
                <Room setRoomID={setroomID} />
            ) : (
                <div className="userName-main-team-videoContainer">
                    <h2>RoomID : {roomID}</h2>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(roomID);
                        }}
                    >{`Copy RoomID`}</button>

                    <div className="userName-main-team-videos">
                        <div className="userName-main-team-myvideo">
                            {stream && (
                                <video
                                    playsInline
                                    muted
                                    ref={userVideo}
                                    autoPlay
                                    style={{ width: "300px" }}
                                />
                            )}
                        </div>
                        {peers.map((peer, index) => {
                            return (
                                <div className="userName-main-team-myvideo">
                                    <Video peer={peer} key={index} />
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
