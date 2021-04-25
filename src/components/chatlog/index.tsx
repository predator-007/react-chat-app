import React, { useEffect, useState } from 'react';
import './style.css';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from "react-redux";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Userinfo from '../userinfo';
import img from '../userinfo/img.jpg'
import { recieveraction } from '../../services/actions/reciever';
import Searchbar from '../searchbar/searchbar';
const Chatlog:React.FC=()=>{
    const dispatch=useDispatch();
    const userref=firebase.firestore().collection("users");
    const user=useSelector((state:any)=>state.user);

    const [users]=useCollectionData(userref.where("displayName","!=",user.displayName));
   
return(
    <div className="chatlog">
        <Userinfo/>
        <div>
            <Searchbar/>
        </div>
    {
        users?.map(
        (user)=>(
            <span onClick={()=>{
                dispatch(recieveraction(user));
            }}>
            <div className="userslog"> 
            <img src={img}
            alt=""
            className="chatloguserimg"
            ></img>
            <h4 className="h1userlog">{user.displayName}</h4>
            <span className="spanuserlog">{user.status}</span>
            </div>
            </span>
        )
        )
    }
    
    </div>
);
}
export default Chatlog;