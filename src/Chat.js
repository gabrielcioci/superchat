import React from 'react'

import {withRouter} from 'react-router-dom'
import UserPage from "./UserPage";
import ChatRoom from "./ChatRoom";

const Chat = (props) => {
    return (
        <UserPage>
            <ChatRoom/>
        </UserPage>
    )
}

export default withRouter(Chat)