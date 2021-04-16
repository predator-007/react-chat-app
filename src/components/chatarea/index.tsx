import React, { useState } from 'react';
import MsgInput from '../msginput/msginput';
import Senderinfo from '../senderinfo';
import 'firebase/firestore';
import firebase from "firebase/app";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import './style.css';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Chatarea:React.FC=()=>{
    const firestore=firebase.firestore();
    const messageref=firestore.collection("messages");
    const query=messageref.orderBy('createdAt').limit(25);
    const [messages]=useCollectionData(query,{idField:'id'});
    const user=useSelector((state:any)=>state.user);
    const get=()=>{
        messageref.onSnapshot((data1)=>{
            
            data1.forEach((doc)=>{
                console.log(doc.data());
            })
            
        });
    }
    
return(

    <div className="chatarea">
        <Senderinfo/>
        <div className="msgarea">
        <ul>
        {
            messages && messages.map(
                (msg)=>
            (
                
                (msg.from==user.displayName)?
                <li className="smsg">
                <h5 style={{fontSize:"80%"}}>{msg.text}</h5>
                </li>
                :
                <li className="rmsg">
                <h5 style={{fontSize:"80%"}}>{msg.text}</h5>
                </li>
            )
            )
        }
        </ul>
        </div>
        <MsgInput/>
    </div>
);

}

export default Chatarea;