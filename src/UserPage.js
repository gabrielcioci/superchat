import React from 'react'
import {withRouter} from 'react-router-dom'
import firebase from './firebase'
import {useAuthState} from "react-firebase-hooks/auth";

const auth = firebase.auth();

const UserPage = (props) => {
    const [user] = useAuthState(auth);
    return (
        <>
            {user ? props.children : props.history.push("/")}
        </>
    )
}

export default withRouter(UserPage)