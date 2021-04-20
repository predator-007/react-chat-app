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
    const reciever=useSelector((state:any)=>state.reciever);
    
    function time(date:any) {
    var d=date.getDate();
    var m=date.getMonth()+1;
    var year=date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm + '  ' +d+'/'+m+'/'+year;
    return strTime;
    }
    const sendmsg=async(e:React.FormEvent)=>{
            e.preventDefault();
            await messageref.add({
                text:msg,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                from:user.displayName,
                to:reciever,
                time:time(new Date),
            });
            
            setmsg("");
    }
    const check=(obj:{from:string,to:string})=>{
        if(obj.from=="spidy spider" && obj.to=="srijan raj"){
            return true;
        }
    }

return(
    <div className="msginput">
        <form onSubmit={(e)=>{
            sendmsg(e);
            
        }
        }>
        <input type="text" className="inputmessage" placeholder="Type a message..." 
        value={msg}
        onChange={(e)=>{setmsg(e.target.value)}}
        
        ></input>
        <button type="submit" className="btn"><i  style={{color:" rgb(47, 130, 224)"}}className="fa fa-paper-plane"></i></button>
        </form>
    </div>
);
}
export default MsgInput;