import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import Chatarea from '../../components/chatarea';
import Chatlog from '../../components/chatlog';
import firebase from 'firebase/app';
import './style.css';
import Vediochat from '../socketio/vediochat';
import { onlineUsersaction } from '../../services/actions/onlineusers';
import { socketaction } from '../../services/actions/socket';
import { recievingcallaction } from '../../services/actions/recievingcall';
import { calleraction } from '../../services/actions/caller';
import { callersignalaction } from '../../services/actions/callersignal';
import { callmodeaction } from '../../services/actions/callmode';

const Chatpage:React.FC=()=>{
     
    const userref=firebase.firestore().collection('users');
    const user=useSelector((state:any)=>state.user);
    const callmode=useSelector((state:any)=>state.callmode);
    
    const dispatch=useDispatch();
    useEffect(()=>{
        console.log("chat area useEffect");
        
        const socket=io.connect("http://localhost:5000/");
        
        dispatch(socketaction(socket));
        
        socket.emit("connectToSocket",user.displayName);
        
        socket.on("updateUser",(data:{})=>{
            dispatch(onlineUsersaction(data));
        });
        
        socket.on("callUser",(data:any)=>{
            console.log(data.from);
            dispatch(recievingcallaction(true));
            dispatch(calleraction(data.from));
            dispatch(callersignalaction(data.signal));
            dispatch(callmodeaction(true));
        })
    },[]);
return(
    <div className="chatpage">
        <Chatlog/>
        <Chatarea/>
        {
        callmode && (
        <Vediochat/>
        )
        }   
    </div>
);
}
export default Chatpage;