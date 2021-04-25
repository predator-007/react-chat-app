import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Vediochat from '../../containers/socketio/vediochat';
import { callmodeaction } from '../../services/actions/callmode';
import img from '../userinfo/img.jpg';
import './style.css';
const Senderinfo:React.FC=()=>{

const dispatch=useDispatch();
const recieve=useSelector((state:any)=>state.reciever);
const reciever=recieve.displayName;
const callmode=useSelector((state:any)=>state.callmode);
return(
    <div className="senderinfo">
        <img
        className="senderinfoimg"
        src={img}
        alt=""
        ></img>
        <h4 className="senderinfoname">{reciever}</h4>
        <button className="btn" onClick={()=>dispatch(callmodeaction(true))}><i className="fa fa-phone"/></button>
    </div>
);

}
export default Senderinfo;