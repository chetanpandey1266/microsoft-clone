import React, {useEffect, useRef, useState} from 'react'
import Peer from 'simple-peer';



function UserMainTeam(props) {

    const socket = props.socket;

    const me = localStorage.getItem('socket')
    const [myvideo, setMyvideo] = useState(true);
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState("");
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");
    
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video:myvideo, audio:true}).then((stream) => {
            setStream(stream);
            myVideo.current.srcObject = stream;
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from); 
            setName(data.name);
            setCallerSignal(data.signal);
        }) 
    }, [])

    // here we will be creating peer   
    const callUser = (id) => {
        const peer = new Peer({
            initiator:true, 
            trickle:false, 
            stream: stream
        })
        
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                usedToCall: id,
                signalData: data,
                from: me,
                name: name 
            })
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        })

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true); 
            peer.signal(signal); 
        })

        connectionRef.current = peer;
    }

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream 
        })

        peer.on("signal", (data)=> {
            socket.emit("answerCall", {signal:data, to:caller});
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        })

        peer.signal(callerSignal)
        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    }

    console.log(me)

    return (
        <div className="userName-main-team">
            <h1>This is Team Section</h1>
            <h1>{me}</h1>
            <div className="userName-main-team-videoContainer">
                <div className="userName-main-team-video">
                    {stream && <video playsInline muted ref={myVideo} autoplay="true" style={{width:"300px"}} /> }
                </div>
                
                <button onClick={() => setMyvideo(video => !video)}>
                    Video
                </button>
                
                <h1>cvvwkvf</h1>
                {me}

                <div className="userName-main-team-video">
                    {callAccepted && !callEnded ?
                    <video playsInline ref={userVideo} autoplay style={{width:"300px"}} />:null}
                </div>

                <div>
                    {callAccepted && !callEnded ? 
                    <button onClick={leaveCall}>EndCall</button>:
                    <button onClick={() => callUser(idToCall)}>Call</button>}
                </div>
                <div>
                    {receivingCall && !callAccepted ?
                    <button onClick={answerCall}>
                        Answer
                    </button>
                    :null}
                    
                </div>
            </div>
        </div>
    )
}

export default UserMainTeam
