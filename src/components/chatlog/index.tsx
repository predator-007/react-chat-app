import React, { useEffect, useState } from 'react';
import './style.css';
import firebase from 'firebase/app';
import { useSelector } from "react-redux";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Userinfo from '../userinfo';
const Chatlog:React.FC=()=>{
    const userref=firebase.firestore().collection("users");
    const user=useSelector((state:any)=>state.user);
    const [users]=useCollectionData(userref.where("displayName","!=",user.displayName));
    
return(
    <div className="chatlog">
        <Userinfo/>
    {
        users?.map(
        (user)=>(
            <div className="users"><span>{user.displayName}</span>
            <span>{user.status}</span>
            </div>   
        )
        )
    }
    
    </div>
);
}
export default Chatlog;