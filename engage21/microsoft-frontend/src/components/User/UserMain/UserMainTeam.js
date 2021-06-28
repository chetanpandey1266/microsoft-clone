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
        navigator.mediaDevices.getUserMedia({video:true, audio:true}).then((stream) => {
            setStream(stream);
            myVideo.current.srcObject = stream;
        })

        socket.on("me", (id) => {
            localStorage.setItem('socket', id);
            console.log(id)
        })
        socket.connect("http://localhost:5000/user");

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


    return (
        <div className="userName-main-team">
            {/* <h1>This is Team Section</h1> */}
            <div className="userName-main-team-videoContainer">

                <div className="userName-main-team-input">
                    <input type="text" placeholder="userId" onChange={e => setIdToCall(e.target.value)}/>
                    <div style={{margin:"auto"}} >
                        {callAccepted && !callEnded ? 
                        <button style={{backgroundColor:"#D41F01"}} onClick={leaveCall}>EndCall</button>:    
                        <button onClick={() => callUser(idToCall)}>Call</button>}
                    </div>
                </div>
                
                <div className="userName-main-team-videos">

                    <div className="userName-main-team-myvideo">
                        {stream && <video playsInline muted ref={myVideo} autoPlay style={{width:"300px"}} /> }
                        <div className="userName-main-team-myvideo-control">
                        <button>Video</button>
                        <button>Audio</button>
                        </div>
                        <h5>User ID: {me} </h5>
                        <button onClick={() => {navigator.clipboard.writeText(me)}}>{`Copy ID`}</button>
                    </div>
                    
                    {callAccepted && !callEnded ?
                    <div className="userName-main-team-uservideo">
                        <video playsInline ref={userVideo} autoPlay style={{width:"300px"}} />
                        <div className="userName-main-team-uservideo-control">
                            <button>Video</button>
                            <button>Audio</button>
                        </div>
                    </div>:null}
                
                </div>

                <div className="userName-main-team-answer">
                    {receivingCall && !callAccepted ?
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                    <h3>{name} is calling</h3>
                    <button style={{backgroundColor:"#189636"}} onClick={answerCall}>
                        Answer
                    </button>
                    </div>
                    :null}
                </div>
            </div>
        </div>
    )
}

export default UserMainTeam
