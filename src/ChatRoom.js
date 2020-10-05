import React, {useEffect, useRef, useState} from 'react'
import {withRouter, useParams, Link} from "react-router-dom"
import firebase from './firebase'
import {useCollectionData} from "react-firebase-hooks/firestore";
import Message from './Message'

const auth = firebase.auth()
const firestore = firebase.firestore()
const sanitized = require('sanitize-html')

const ChatRoom = (props) => {
    const {name, id} = useParams();
    const {uid, photoURL, displayName, email} = auth.currentUser
    const messagesRef = firestore.collection('rooms').doc(id).collection("messages")
    const query = messagesRef.orderBy('createdAt').limit(500)
    const [messages] = useCollectionData(query, {idField: 'id'})
    const [formValue, setFormValue] = useState('')
    const scrollToLastMessage = useRef()

    const sendMessage = async (e) => {
        e.preventDefault();
        const cleanInput = sanitized(formValue, {allowedAttributes: [], allowedTags: []})
        if (cleanInput.trim().length > 0) {
            await messagesRef.add({
                text: cleanInput,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL,
                displayName,
            })
        }
        setFormValue('')
    }

    const handleChange = (e) => {
        setFormValue(e.target.value)
    }
    useEffect(() => {
        scrollToLastMessage.current.scrollIntoView({behavior: 'smooth'});
    })
    return (
        <div className="chat-room">
            <div className="profile">
                <div className="profile-info">
                    <img src={photoURL} className="avatar" alt="profile-avatar"/>
                    <div>
                        <h2>{displayName}</h2>
                        <p>{email}</p>
                    </div>
                </div>
                <div className="actions">
                    <button className="btn gray" onClick={() => auth.signOut()}>Sign out</button>
                    <Link to="/" className="btn">Change room</Link>
                </div>
            </div>
            <div className="chat">
                <div className="chat-header">{name}</div>
                <div className="messages">
                    {messages && messages.map(msg => <Message key={msg.id} message={msg}/>)}
                    <div ref={scrollToLastMessage}/>
                </div>
                <form className="chat-reply" onSubmit={sendMessage}>
                    <input value={formValue} onChange={(e) => handleChange(e)} type="text" className="reply"/>
                    <button className="btn" type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default withRouter(ChatRoom)