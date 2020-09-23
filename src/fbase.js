import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import React from 'react'

firebase.initializeApp({
  apiKey: "AIzaSyApy6zXnsOPXDwFvply7Nqu8qGFtxFgYFc",
  authDomain: "react-chat-ddecd.firebaseapp.com",
  databaseURL: "https://react-chat-ddecd.firebaseio.com",
  projectId: "react-chat-ddecd",
  storageBucket: "react-chat-ddecd.appspot.com",
  messagingSenderId: "578831107597",
  appId: "1:578831107597:web:065fc4c635b95feb1db744",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// const analytics = firebase.analytics();

export function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google like a boss
      </button>
      <p>
        Give it a try.
      </p>
    </>
  );
}

export function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}
