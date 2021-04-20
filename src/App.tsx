import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Chatpage from './containers/chatpage';
import Login from './containers/login signup/login';
import Vediochat from './containers/socketio/vediochat';
import { init } from "./services/firebase";
import firebase from 'firebase/app';
import { useEffect } from 'react';
import { useraction } from './services/actions/user';
init();
function App() {
  const dispatch=useDispatch();
  const user=useSelector((state:any)=>state.user);
  useEffect(()=>{
    const User=sessionStorage.getItem('user');
    if(User!=null){
    dispatch(useraction(JSON.parse(User)));
    console.log("app",JSON.parse(User));
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
