import React from 'react'
import firebase from './firebase'
import {withRouter} from "react-router-dom"

const auth = firebase.auth()

const Message = (props) => {
    const {text, uid, photoURL, displayName} = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} className="avatar" alt="avatar"/>
            <div className="message-body">
                <span className="display-name">{displayName}</span>
                <span className="text-message">{text}</span>
            </div>
        </div>
    )
}

export default withRouter(Message)