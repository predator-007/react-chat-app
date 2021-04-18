import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useraction } from '../../services/actions/user';

import { Avatar, Grid, Paper, TextField } from '@material-ui/core';
import './style.css';
import { Button } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { ClassTwoTone, CloudUpload, Facebook, MailOutline, Twitter } from '@material-ui/icons';
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
  const providergoogle=new firebase.auth.GoogleAuthProvider();
  const providerfacebook=new firebase.auth.FacebookAuthProvider();
  const providertwitter=new firebase.auth.TwitterAuthProvider();
  const userref=firebase.firestore().collection("users");
  const dispatch=useDispatch(); 
  const adduser=(name:any)=>{
    userref.doc(name).set({
      displayName:name,
      status:"online"
    })           
  }
  
  const loginwithtwitter=()=>{
    auth.signInWithPopup(providertwitter).then(
    (result)=>{
        console.log(result.user);
    }
    ).catch(err=>console.log(err));
  }
  const loginwithfacebook=()=>{
    auth.signInWithPopup(providerfacebook).then(
    (result)=>{
        console.log(result.user);
    }
    ).catch(err=>console.log(err));
  }
   const loginwithgoogle=()=>{
      auth.signInWithPopup(providergoogle).then(async(result)=>{
            dispatch(useraction(result.user)); 
            adduser(result.user?.displayName);
          }).catch((err)=>console.log(err));
  }
   return(
    <body className="bodylogin" >
    <Grid>
      <Paper elevation={10}>
        <Grid container spacing ={0} justify='center' alignItems='center' direction='column'>
          <Avatar ><ChatBubbleOutlineIcon/></Avatar>
         <h2 >Sign In/Sign Up</h2>

        </Grid>
        <TextField label='Username' placeholder='Enter username' fullWidth required />
        <TextField label='Password' placeholder='Enter password' type='password' fullWidth required/>
        <Button variant='contained' type='submit' color='primary' >Sign In</Button>
        <Button variant='contained' type='submit' color='primary' >Sign Up</Button>
        <Button className="button"  variant="contained" color='primary' fullWidth startIcon={<MailOutline />}  onClick={()=>loginwithgoogle()}>Sign In Using Gmail</Button>
        <Button className="button"  variant="contained" color='primary' fullWidth startIcon={<Facebook />}  onClick={()=>loginwithfacebook()}>Sign In Using Facebook</Button>
        <Button className="button"  variant="contained" color='primary' fullWidth startIcon={<Twitter />}  onClick={()=>loginwithtwitter()}>Sign In Using Twitter</Button>
      </Paper>
    </Grid>
    
</body>
      
);
}
export default Login;