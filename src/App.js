import React, { useRef, useState } from 'react';
import './App.css';

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import firebase from "firebase/app";
import {auth, firestore, SignOut, SignIn } from './fbase'


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">

      <header>
        <h1><span role="img" aria-label="fire">React-Firebase-Chat ⚛️🔥💬</span></h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}



function ChatRoom() {
  const dummy = useRef(); // to enable scrolling down to bottom, extra div and this ref...
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      <span ref={dummy}></span>
    </main>

    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} 
      placeholder="speak mind here" />
      <button type="submit" disabled={!formValue}>
        <span role="img" aria-label="submit">🕊️</span>
        </button>
    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="chat user" />
      <p>{text}</p>
    </div>
  </>)
}


export default App;