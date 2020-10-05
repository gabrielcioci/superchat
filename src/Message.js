import React from 'react'
import firebase from './firebase'
import {withRouter} from "react-router-dom"

const auth = firebase.auth()

const Message = (props) => {
    const {text, session_superchat, user_avatar, user_display_name} = props.message;
    const messageClass = session_superchat === auth.currentUser.uid ? 'sent' : 'received';
    return (
        <div className={`message ${messageClass}`}>
            <img src={user_avatar} className="avatar" alt="avatar"/>
            <div className="message-body">
                <span className="display-name">{user_display_name}</span>
                <span className="text-message">{text}</span>
            </div>
        </div>
    )
}

export default withRouter(Message)