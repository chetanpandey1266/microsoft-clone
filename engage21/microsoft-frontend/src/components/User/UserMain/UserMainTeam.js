import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { v1 as uuid } from "uuid";

function UserMainTeam(props) {
    const socket = props.socket;

    const me = localStorage.getItem("socket");
    const [myvideo, setMyvideo] = useState(true);
    const [stream, setStream] = useState();
    const [peers, setPeers] = useState([]);
    const [roomID, setroomID] = useState("");
    const [dummyID, setdummyID] = useState("");

    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        if (roomID !== "") {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setStream(stream);
                    userVideo.current.srcObject = stream;
                });

            socket.emit("join room");
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
    function create() {
        const id = uuid();
        setroomID(id);
    }

    return (
        <div className="userName-main-team">
            {roomID === "" ? (
                <div>
                    <div className="userName-main-call-input">
                        <input
                            type="text"
                            placeholder="roomId"
                            onChange={(e) => setdummyID(e.target.value)}
                        />
                        <button onClick={() => setroomID(dummyID)}>
                            Join Room
                        </button>
                    </div>
                    <button onClick={create}>Create Room</button>
                </div>
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
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMainTeam;
