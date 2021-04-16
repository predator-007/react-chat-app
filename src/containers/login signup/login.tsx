import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import firebase from "firebase/app";
import { useDispatch, useSelector } from 'react-redux';
import { useraction } from '../../services/actions/user';
import './style.css';
const Login : React.FC=()=>{
/*
  const [email,setemail]=useState<string >("");
  const [password,setpassword]=useState<string>("");
  const [status,setstatus]=useState<string>("");
 
  const validateemail=()=>{
    if(email.length>=5 && email.length<=255)
    {
      let ap=email.search("@");
      let cp=email.search(".com");
      if(ap==-1 && cp==-1 && ap>cp)
        return false;
      return true;
    }
    else
    return false;
  }
  const validatepassword=()=>{
    return password.length>=6&&password.length<=1024;
  }
  const handlesubmit=async ()=>{
    if(!validateemail())
    {
      setstatus("enter valid email");
      return;
    }
    if(!validatepassword())
    {
      setstatus("password should have min 6 characters");
      return;
    }
  
  }
  
    */
   const auth=firebase.auth();
   const provider=new firebase.auth.GoogleAuthProvider();
   const dispatch=useDispatch();
   const login=()=>{
    auth.signInWithPopup(provider).then((result)=>{
              dispatch(useraction(result.user))
    }).catch((err)=>console.log(err));
  }
   return(
      <body className="bodylogin" >
        <Button className="button" variant="danger" onClick={()=>login()}>login</Button>
    </body>
);
};
export default Login;