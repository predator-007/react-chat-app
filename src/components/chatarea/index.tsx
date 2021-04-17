import React, { useState } from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import Welcome from './welcome';
import Messages from './messages';

const Chatarea:React.FC=()=>{
    const user=useSelector((state:any)=>state.user);
    const reciever=useSelector((state:any)=>state.reciever);
    
return(
    <div>
        {
        (!reciever)?
        <Welcome/>
        :
        <Messages/>
    }
    </div>
);

}

export default Chatarea;