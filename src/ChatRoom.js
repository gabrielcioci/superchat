import React, {useEffect, useRef, useState} from 'react'
import {withRouter, useParams, Link} from "react-router-dom"
import firebase from './firebase'
import {useCollectionData} from "react-firebase-hooks/firestore";
import Message from './Message'
import {useCookies} from "react-cookie";

const auth = firebase.auth()
const firestore = firebase.firestore()
const sanitized = require('sanitize-html')

const ChatRoom = (props) => {
    const {name, id} = useParams();
    const [cookies, setCookie] = useCookies(['name'])
    const {session_superchat, user_avatar, user_display_name, user_email} = cookies
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
                uid: session_superchat,
                photoURL: user_avatar,
                displayName: user_display_name,
            })
        }
        setFormValue('')
    }

    const handleChange = (e) => {
        setFormValue(e.target.value)
    }
    const handleSignOut = (e, auth) => {
        e.preventDefault()
        auth.signOut()
        props.history.push("/")
    }
    useEffect(() => {
        scrollToLastMessage.current.scrollIntoView({behavior: 'smooth'});
    })
    return (
        <div className="chat-room">
            <div className="profile">
                <div className="profile-info">
                    <img src={user_avatar} className="avatar" alt="profile-avatar"/>
                    <div>
                        <h2>{user_display_name}</h2>
                        <p>{user_email}</p>
                    </div>
                </div>
                <div className="actions">
                    <div className="btn gray" onClick={(e) => handleSignOut(e, auth)}>Sign out</div>
                    <Link to="/rooms" className="btn">Change room</Link>
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