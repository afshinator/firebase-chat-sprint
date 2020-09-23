import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import React from 'react'

import keys from "./secrets"    // Get your own key from firebase

firebase.initializeApp(keys);

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
