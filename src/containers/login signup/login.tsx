import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from "firebase/app";
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useraction } from '../../services/actions/user';
import './style.css';
import { Avatar, Grid, Paper} from '@material-ui/core';
import { ChatBubbleOutline, MailRounded} from '@material-ui/icons';

const Login : React.FC=()=>{
  const auth=firebase.auth();
  const providergoogle=new firebase.auth.GoogleAuthProvider();
  const userref=firebase.firestore().collection("users");
  const dispatch=useDispatch(); 
  
  
  const adduser=(name:any)=>{
    console.log("name checking",name);
    userref.doc(name).set({
      displayName:name,
      status:"online",
    }).catch(err=>{
      console.log(err);
    })           
  }
  
   const loginwithgoogle=()=>{

    auth.signInWithPopup(providergoogle).then(async(result)=>{
          dispatch(useraction(result.user));
            adduser(result.user?.displayName);
          }).catch((err)=>console.log(err));       
  
    }
  const paperStyle={padding:20,height:'70vh',width:380,margin:"100px auto"};
  const avatarStyle={backgroundColor:'#28c328'};
  const headStyle={margin:"10px 0"};
  const gmailStyle={margin:"5px 0",marginTop:"45%"};
   return( 
      <body className="bodylogin" >
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid container spacing={0} justify='center' alignItems='center' direction='column'>
              <Avatar style={avatarStyle}><ChatBubbleOutline/></Avatar>
            <h2 style={headStyle}>Sign In/Sign Up</h2>            
            </Grid>
            <Button type='submit' style={gmailStyle} variant="contained" color='secondary' fullWidth startIcon={<MailRounded/>} onClick={()=>loginwithgoogle()}> Gmail</Button>
          </Paper>
        </Grid>
    </body>
);
};
export default Login;