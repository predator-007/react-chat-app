import Senderinfo from "../senderinfo";
import firebase from 'firebase/app';
import { useCollectionData } from "react-firebase-hooks/firestore";
import MsgInput from "../msginput/msginput";
import { useSelector } from "react-redux";
import './style.css';
const Messages=()=>{
    
    
    const user=useSelector((state:any)=>state.user);
    const reciever=useSelector((state:any)=>state.reciever);
    const firestore=firebase.firestore();
    const messageref=firestore.collection("messages");
    const query=messageref.orderBy('createdAt').limit(25);
    var [messages]=useCollectionData(query);
    messages=messages?.filter(obj=>(obj.from==user.displayName&&obj.to==reciever)||(obj.from==reciever&&obj.to==user.displayName));
    
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
                        <h5 className="msgtext">{msg.text}</h5>
                        </li>
                    :
                    <li className="rmsg">
                    <h5 className="msgtext">{msg.text}</h5>
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
export default Messages;