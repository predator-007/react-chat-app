import React,{useState,useEffect,useRef} from 'react';
import io  from "socket.io-client";
import Peer from "simple-peer";
import { Grid, Input, Paper, TextField, Typography } from '@material-ui/core';
import { Button } from 'react-bootstrap';

const socket =io.connect("https://react-chat-appbackend.herokuapp.com/");

const Vediochat:React.FC=()=>{
    const [me,setMe]=useState<any>("");
    const [stream,setStream]=useState<any>(null);
    const [recievingCall,setRecievingCall]=useState<boolean>(false);
    const [caller,setcaller]=useState<any>("");
    const [callerSignal,setCallerSignal]=useState<any>();
    const [callAccepted,setCallAccepted]=useState<boolean>(false);
    const [idToCall,setIdToCall]=useState<any>("");
    const [callEnded,setCallEnded]=useState<any>(false); 
    const [name,setName]=useState<string>("");
    
    const myVideo=useRef<any>();
    const userVideo=useRef<any>();
    const connectionRef=useRef<any>();

    useEffect(()=>{

        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((stream)=>{
            setStream(stream);
            myVideo.current.srcObject =stream;
        });
        
        socket.on("me",(id:any)=>{setMe(id)});

        socket.on("callUser",(data:any)=>{
            setRecievingCall(true);
            setcaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        })
    },[]);

    const calluser=(id:any)=>{
        const peer =new Peer(
        {
            initiator:true,
            trickle:false,
            stream:stream,
        }
        )

        peer.on("signal",(data)=>{
            socket.emit("callUser",{
                userToCall:id,
                signalData:data,
                from:me,
                name:name,
            })
        })

        peer.on("stream",(stream)=>{
            userVideo.current.srcObject= stream;
        })

        socket.on("callAccepted",(signal:any)=>{
            setCallAccepted(true);
            peer.signal(signal);
        })

        connectionRef.current=peer;

    };

    const answercall=()=>{
        
        setCallAccepted(true);
        const peer =new Peer({
            initiator:false,
            trickle:false,
            stream:stream,
        });

        peer.on("signal",(data)=>{
            socket.emit("answerCall", {signal:data,to:caller})
        });

        peer.on("stream",(stream)=>{
            userVideo.current.srcObject=stream;
        });

        peer.signal(callerSignal);
        connectionRef.current=peer;
    }
    
    const leavecall=()=>{
        setCallEnded(true);
        connectionRef.current.destroy();
    }

    return(
    <div className="VedioChat">
        <div className="container">
            <div className="video-container">
                <div className="video">
                {stream && <video playsInline muted ref={myVideo} autoPlay style={{width:"300px"}}></video>}
                </div>
                <div  className="video">
                { callAccepted && !callEnded ?
                <video playsInline  ref={userVideo} autoPlay style={{width:"300px"}}></video>:
                    null
                }
                </div>
            </div>
            <div className="myid">
            <TextField label="Name" value={name} onChange={(e)=>setName(e.target.value)}></TextField>
            <Button onClick={()=>{console.log(me)}}>getid</Button>
            <br/>
            <TextField label="idtocall" value={idToCall} onChange={(e)=>setIdToCall(e.target.value)}></TextField>
            <div className="call-button">
                {   callAccepted && !callEnded ?
                    (
                        <Button onClick={()=>{leavecall()}}>end call</Button>
                    )
                    :
                    (
                        <Button onClick={()=>{calluser(idToCall)}}>call</Button>
                    )
                }
                {idToCall}
            </div>
            </div>
            <div>
            {
                recievingCall && !callAccepted ?
                (
                    <div className="caller">
                        <h1>{name} is calling ... </h1>
                        <Button onClick={()=>{answercall()}}>answer</Button>
                    </div>
                )
                :
                null
            }
            </div>
        </div>    
    </div>


        );
}
export default Vediochat;