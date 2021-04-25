import React,{useState,useEffect,useRef} from 'react';
import io  from "socket.io-client";
import Peer from "simple-peer";
import { Grid, Input, Paper, TextField, Typography } from '@material-ui/core';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { recievingcallaction } from '../../services/actions/recievingcall';
import { calleraction } from '../../services/actions/caller';
import { callernameaction } from '../../services/actions/callername';
import { callersignalaction } from '../../services/actions/callersignal';
import { callacceptedaction } from '../../services/actions/callaccepted';
import { callendedaction } from '../../services/actions/callended';
import { callmodeaction } from '../../services/actions/callmode';
//const socket =io.connect("https://react-chat-appbackend.herokuapp.com/");

const Vediochat:React.FC=()=>{
    const dispatch=useDispatch();

    const socket=useSelector((state:any)=>state.socket);
    const user=useSelector((state:any)=>state.user);
    const reciever=useSelector((state:any)=>state.reciever);
    const caller=useSelector((state:any)=>state.caller);
    const callerSignal=useSelector((state:any)=>state.callersignal);
    const callAccepted=useSelector((state:any)=>state.callaccepted);
    const callEnded=useSelector((state:any)=>state.callended);
    const name=useSelector((state:any)=>state.callername);
    const recievingCall=useSelector((state:any)=>state.recievingcall);
    const callmode=useSelector((state:any)=>state.callmode);
    
    const [calling,setcalling]=useState<boolean>(false);

    const idToCall=reciever.socketioid;
    const username=user.displayName;

    const [stream,setStream]=useState<any>(null);

    const myVideo=useRef<any>();
    const userVideo=useRef<any>();
    const connectionRef=useRef<any>();

    useEffect(()=>{

        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((stream)=>{
            setStream(stream);
            myVideo.current.srcObject =stream;
        });    
        
        /*
        socket.on("me",(id:any)=>{
            setMe(id);
            console.log(id);
            userref.doc(username).update(
                {
                    socketid:id
                }
            )
        });*/
        /*
        socket.on("callUser",(data:any)=>{
            console.log(data);
            dispatch(recievingcallaction(true));
            dispatch(calleraction(data.from));
            dispatch(callernameaction(data.name));
            dispatch(callersignalaction(data.signal));
        
        })*/
    },[]);

    const calluser=(id:any)=>{
        console.log("calling user",reciever.displayName, id);
        setcalling(true);
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
                from:user.socketioid,
                name:user.displayName,
            })
        })

        peer.on("stream",(stream)=>{
            userVideo.current.srcObject= stream;
        })

        socket.on("callAccepted",(signal:any)=>{
            dispatch(callacceptedaction(true));
            setcalling(false);
            peer.signal(signal);
        })

        connectionRef.current=peer;

    };

    const answercall=()=>{
        dispatch(callacceptedaction(true));
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
        dispatch(callendedaction(true));
        connectionRef.current.destroy();
        window.location.reload();
    }
    return(
    <Modal show={callmode}
    backdrop="static"
    keyboard={false}
    >
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
            <br/>
            <div className="call-button">
                {   callAccepted && !callEnded ?
                    (
                        <Button onClick={()=>{leavecall()}}>end call</Button>
                    )
                    :
                    (
                        calling?
                        <h1>calling {reciever.displayName}</h1>
                        :
                        !recievingCall &&(
                        <Button onClick={()=>{calluser(idToCall)}}>call</Button>)
                    )
                }
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
    <button className="btn" onClick={()=>{dispatch(callmodeaction(false));window.location.reload();}}>close</button>
    </Modal>

        );
}
export default Vediochat;