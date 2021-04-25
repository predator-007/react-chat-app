import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Chatpage from './containers/chatpage';
import Login from './containers/login signup/login';
import Vediochat from './containers/socketio/vediochat';
import { init } from "./services/firebase";
import firebase from 'firebase/app';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { useraction } from './services/actions/user';
import { socketaction } from './services/actions/socket';
import { recievingcallaction } from './services/actions/recievingcall';
import { calleraction } from './services/actions/caller';
import { callernameaction } from './services/actions/callername';
import { callersignalaction } from './services/actions/callersignal';
import { callmodeaction } from './services/actions/callmode';
import { recieveraction } from './services/actions/reciever';

const socket =io.connect("https://react-chat-appbackend.herokuapp.com/");
init();
function App() {
  const userref=firebase.firestore().collection('users');
  
  const dispatch=useDispatch();
  const user=useSelector((state:any)=>state.user);
  const reciever=useSelector((state:any)=>state.reciever);
  const chatlogusers=useSelector((state:any)=>state.chatlogusers);
  useEffect(()=>{
    if(user){
      socket.on("me",(id:any)=>{
      console.log(id);
    userref.doc(user.displayName).update({
       socketioid:id
    })
    dispatch(useraction({...user,socketioid:id}));
    });
     
    socket.on("callUser",(data:any)=>{
      dispatch(recieveraction({displayName:data.name,socketioid:data.from}));
      dispatch(recievingcallaction(true));
      dispatch(calleraction(data.from));
      dispatch(callernameaction(data.name));
      dispatch(callersignalaction(data.signal));
      dispatch(callmodeaction(true));
   })
 
    dispatch(socketaction(socket));    
    
    console.log("app in useEffect",user);
  }
    },[]);
  return (
    <div className="App">
      {
        (!user)?
       <Login/>
       :
       <Chatpage/>
      } 
      </div>
    
    /*  
   <div className="App">
     <Vediochat/>
   </div>*/
  );
}
export default App;
