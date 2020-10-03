import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'

const Room = (props) => {
    const roomType = props.room.roomPassword.trim().length > 0 ? "Private" : "Public"
    const [expanded, setExpanded] = useState(false)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const usersInRoom = Math.floor(Math.random() * 30 + 1)
    const handleJoin = (e, room) => {
        e.preventDefault()
        if (roomType === "Private") {
            setShowPassword(true)
            return
        }
        props.history.push(`/room/${room.roomName}/${room.id}`)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password === props.room.roomPassword)
            props.history.push(`/room/${props.room.roomName}/${props.room.id}`)
        else alert("Wrong password")
    }
    return (
        <div className="room" onClick={(e) => setExpanded(!expanded)}>
            {!showPassword ? <>
                    <div className="quick-info">
                        <h3>{props.room.roomName}</h3>
                        <button className="btn join" onClick={(e) => handleJoin(e, props.room)}>Join</button>
                    </div>
                    <div className={`additional-info ${expanded && "expanded"}`}>
                        <p>Room type: {roomType}</p>
                        <p>Participants: <span>{usersInRoom}</span></p>
                    </div>
                </> :
                <form className="password-input" onSubmit={handleSubmit}>
                    <input type="password" value={password} placeholder="Room password"
                           onChange={(e) => setPassword(e.target.value)}/>
                    <span className="close-password" onClick={(e) => setShowPassword(false)}>x</span>
                </form>}
        </div>
    )
}

export default withRouter(Room)