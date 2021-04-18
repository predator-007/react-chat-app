import { useSelector } from 'react-redux';
import './App.css';
import Chatpage from './containers/chatpage';
import Login from './containers/login signup/login';
import { init } from "./services/firebase";
init();
function App() {
  const user=useSelector((state:any)=>state.user);
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
