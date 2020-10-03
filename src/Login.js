import React from 'react'
import {withRouter} from "react-router-dom"
import CreateRoom from "./CreateRoom";
import firebase from "./firebase";
import {useAuthState} from "react-firebase-hooks/auth";

const auth = firebase.auth();

const Login = () => {
    const [user] = useAuthState(auth);
    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <>
            {user ? <CreateRoom/> :
                <button className="btn sign-in" onClick={googleSignIn}>Sign in with Google</button>
            }
        </>
    )
}

export default withRouter(Login)