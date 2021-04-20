import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from "firebase/app";
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useraction } from '../../services/actions/user';
import './style.css';
import { Avatar, Grid, Paper, TextField } from '@material-ui/core';
import { ChatBubbleOutline, ChatBubbleOutlined, Facebook, MailOutline, Twitter } from '@material-ui/icons';
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
            sessionStorage.setItem('user',JSON.stringify(result.user));
          }).catch((err)=>console.log(err));       
        
  }
  const paperStyle={padding:20,height:'70vh',width:380,margin:"100px auto"};
  const avatarStyle={backgroundColor:'#28c328'};
  const b1Style={margin:"20px 40px"};
  const b2Style={margin:"20px 35px"};
  const unameStyle={margin:"8px 0"};
  const headStyle={margin:"10px 0"};
  const gmailStyle={margin:"5px 0"};
  const fbStyle={margin:"5px 0"};
  const twitterStyle={margin:"5px 0"};
   return(
      
      <body className="bodylogin" >
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid container spacing={0} justify='center' alignItems='center' direction='column'>
              <Avatar style={avatarStyle}><ChatBubbleOutline/></Avatar>
            <h2 style={headStyle}>Sign In/Sign Up</h2>
            </Grid>
            <TextField label='Username' placeholder='Enter Username' fullWidth required style={unameStyle}/>
            <TextField label='Password' placeholder='Enter Password' fullWidth required/>
            <Button variant='contained' type='submit' color='primary' style={b1Style}>Sign In</Button>
            <Button variant='contained' type='submit' color='primary' style={b2Style}>Sign Up</Button>
            <Button type='submit' style={gmailStyle} variant="contained" color='primary' fullWidth startIcon={<MailOutline/>} onClick={()=>loginwithgoogle()}>Sign In using Gmail</Button>
            <Button type='submit' style={fbStyle} variant="contained" color='primary' fullWidth startIcon={<Facebook/>} onClick={()=>loginwithfacebook()}>Sign In using Facebook</Button>
            <Button type='submit' style={twitterStyle} variant="contained" color='primary' fullWidth startIcon={<Twitter/>} onClick={()=>loginwithtwitter()}>Sign In using Twitter</Button>
          </Paper>
        </Grid>
    </body>
);
};
export default Login;