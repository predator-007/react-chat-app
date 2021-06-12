import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Chatpage from './containers/chatpage';
import Login from './containers/login signup/login';
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

init();
function App() {
  const userref=firebase.firestore().collection('users');
  
  const dispatch=useDispatch();
  const user=useSelector((state:any)=>state.user);
  const reciever=useSelector((state:any)=>state.reciever);
  const chatlogusers=useSelector((state:any)=>state.chatlogusers);

  return (
    <div className="App">
      {
        (!user)?
       <Login/>
       :
       <Chatpage/>
      } 
      </div>
  );
}
export default App;
