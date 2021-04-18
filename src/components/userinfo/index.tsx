import { useDispatch, useSelector } from 'react-redux';
import img from './img.jpg';
import './style.css';
import firebase from 'firebase/app';
import { useraction } from '../../services/actions/user';
const Userinfo:React.FC=()=>{
const user=useSelector((state:any)=>state.user);
const auth=firebase.auth();
const dispatch=useDispatch();
const db=firebase.firestore();
const signout=()=>{
    auth.signOut().then(res=>console.log("signout succesfully"))
    .catch(err=>console.log(err));
    db.collection("users").doc(user.displayName).update(
        {
            status:"offline",
        }
    );
    dispatch(useraction(null));
}
return(
    <div className="userinfo">
    <img src={img}
    alt="profile image"
    className="userimg"
    ></img>
    <h4 className="username">{user.displayName}</h4> 
    <button id="logoutbtn" className="btn"
    onClick={()=>signout()}
    ><i className="fa fa-sign-out" style={{color:"black"}}></i></button>
    </div>
);
}
export default Userinfo;