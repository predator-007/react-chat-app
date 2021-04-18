import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import { useCollectionData } from "react-firebase-hooks/firestore";
export const init =()=>{ 
    if (!firebase.apps.length) {     
    firebase.initializeApp({
    apiKey: "AIzaSyBS0xkI0RYyTAVGPi-noEUPR2zLw79LhQ4",
    authDomain: "react-chat-app-40025.firebaseapp.com",
    projectId: "react-chat-app-40025",
    storageBucket: "react-chat-app-40025.appspot.com",
    messagingSenderId: "361376102779",
    appId: "1:361376102779:web:55eb136a64473f2a1525de",
    measurementId: "G-9M0Y5GTQ1F",
  })
}
  else {
    firebase.app(); 
 }
}

/*
export const auth = firebase.auth();
export const firestore=firebase.firestore();
export const provider=new firebase.auth.GoogleAuthProvider();

export const firebaseconfig=
{
  apiKey: "AIzaSyBS0xkI0RYyTAVGPi-noEUPR2zLw79LhQ4",
  authDomain: "react-chat-app-40025.firebaseapp.com",
  projectId: "react-chat-app-40025",
  storageBucket: "react-chat-app-40025.appspot.com",
  messagingSenderId: "361376102779",
  appId: "1:361376102779:web:55eb136a64473f2a1525de",
  measurementId: "G-9M0Y5GTQ1F"
}
*/