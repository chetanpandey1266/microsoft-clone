import React, {useEffect, useRef, useState} from 'react'
import Peer from 'simple-peer';



function UserMainTeam(props) {

    const socket = props.socket;

    const me = localStorage.getItem('socket');
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

        console.log(id)
        setReceivingCall(true)
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

        // Received a remote video stream, which can be displayed in a video tag
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        })

        socket.on("callAccepted", (signal) => {
            console.log("callAccepted ", signal);
            setCallAccepted(true); 
            peer.signal(signal); 
        })

        connectionRef.current = peer;
    }

    const answerCall = () => {
        setCallAccepted(false);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream 
        })
        console.log("Yahan aaya kya", callerSignal)
        
        console.log("yahan")
        peer.on("signal", (data)=> {
            console.log("peer.on signal", data);
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


    return (
        <div className="userName-main-team">
            <h1>This is Team Section</h1>
            <div className="userName-main-team-videoContainer">
                <div className="userName-main-team-video">
                    {stream && <video playsInline muted ref={myVideo} autoPlay style={{width:"300px"}} /> }
                </div>
                
                <button onClick={myVideo.pause}>
                    Video
                </button>
                
                <h5> User Id: {me} </h5>

                <div className="userName-main-team-video">
                    {callAccepted && !callEnded ?
                    <video playsInline ref={userVideo} autoPlay style={{width:"300px"}} />:null}
                </div>
                <form>
                    <input type="text" placeholder="userId" onChange={e => setIdToCall(e.target.value)}/>
                </form>
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
