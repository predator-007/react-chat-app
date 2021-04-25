import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chatarea from '../../components/chatarea';
import Chatlog from '../../components/chatlog';
import io from 'socket.io-client';
import firebase from 'firebase/app';
import './style.css';
import { useraction } from '../../services/actions/user';
import { socketaction } from '../../services/actions/socket';
import { recievingcallaction } from '../../services/actions/recievingcall';
import { calleraction } from '../../services/actions/caller';
import { callernameaction } from '../../services/actions/callername';
import { callersignalaction } from '../../services/actions/callersignal';
import { callmodeaction } from '../../services/actions/callmode';
import Vediochat from '../socketio/vediochat';

const Chatpage:React.FC=()=>{
     
    const userref=firebase.firestore().collection('users');
    const socket=useSelector((state:any)=>state.socket);
    const user=useSelector((state:any)=>state.user);
    const callmode=useSelector((state:any)=>state.callmode);
    

    const dispatch=useDispatch();
    useEffect(()=>{
    console.log("chat area in useEffect");
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