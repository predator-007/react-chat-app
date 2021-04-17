import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chatarea from '../../components/chatarea';
import Chatlog from '../../components/chatlog';
import './style.css';
const Chatpage:React.FC=()=>{
return(
    <div className="chatpage">
        <Chatlog/>
        <Chatarea/>
    </div>
);
}
export default Chatpage;