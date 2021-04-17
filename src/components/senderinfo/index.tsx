import React from 'react';
import { useSelector } from 'react-redux';
import img from '../userinfo/img.jpg';
import './style.css';
const Senderinfo:React.FC=()=>{
const reciever=useSelector((state:any)=>state.reciever);
return(
    <div className="senderinfo">
        <img
        className="senderinfoimg"
        src={img}
        alt=""
        ></img>
        <h4 className="senderinfoname">{reciever}</h4>
    </div>
);

}
export default Senderinfo;