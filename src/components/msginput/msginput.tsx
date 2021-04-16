import React, { useState } from 'react';
import firebase from 'firebase/app';
import './style.css';
import { Form } from "react-bootstrap";
import { useSelector } from 'react-redux';
const MsgInput:React.FC=()=>{
    const firestore=firebase.firestore();
    const messageref=firestore.collection("messages");
    const [msg,setmsg]=useState<string>("");
    const user=useSelector((state:any)=>state.user);
    const sendmsg=async(e:React.FormEvent)=>{
            e.preventDefault();
            await messageref.add({
                text:msg,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                from:user.displayName,
            });
            setmsg("");
    }
return(
    <div className="msginput">
        <form onSubmit={(e)=>sendmsg(e)}>
        <input type="text" className="form-contro" placeholder="Type a message..." 
        onChange={(e)=>setmsg(e.target.value)}
        ></input>
        <button type="submit" className="btn"><i  className="fas fa-camera"></i></button>
        </form>
    </div>
);
}
export default MsgInput;