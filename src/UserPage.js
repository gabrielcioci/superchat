import React from 'react'
import {withRouter} from 'react-router-dom'
import {useCookies} from "react-cookie";


const UserPage = (props) => {
    const [cookies, setCookie] = useCookies(['name'])
    return (
        <>
            {cookies.session_superchat ? props.children : props.history.push("/")}
        </>
    )
}

export default withRouter(UserPage)