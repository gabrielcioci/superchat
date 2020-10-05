import React from 'react'
import {withRouter} from "react-router-dom"
import firebase from "./firebase"
import {useCookies} from "react-cookie";

const auth = firebase.auth();

const Login = (props) => {
    const [cookies, setCookie] = useCookies(['name'])
    const googleSignIn = (e, props) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function () {
            setCookie('session_superchat', auth.currentUser.uid, {path: '/'})
            setCookie('user_avatar', auth.currentUser.photoURL, {path: '/'})
            setCookie('user_display_name', auth.currentUser.displayName, {path: '/'})
            setCookie('user_email', auth.currentUser.email, {path: '/'})
            props.history.push("/rooms")
        });
    }
    return (
        <>
            <button className="btn sign-in" onClick={(e) => googleSignIn(e, props)}>Sign in with Google</button>
        </>
    )
}

export default withRouter(Login)