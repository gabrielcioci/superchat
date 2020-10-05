import React from 'react'
import {withRouter} from "react-router-dom"
import firebase from "./firebase";

const auth = firebase.auth();

const Login = (props) => {
    const googleSignIn = (e, props) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function () {
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