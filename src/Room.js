import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'

const Room = (props) => {
    const roomType = props.room.roomPassword.trim().length > 0 ? "Private" : "Public"
    const [expanded, setExpanded] = useState(false)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const usersInRoom = Math.floor(Math.random() * 30 + 1)
    const [formError,setFormError]=useState('')
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
        else setFormError("Password is incorrect")
    }
    return (
        <div className="room">
            <div className="quick-info">
                <h3 onClick={(e) => setExpanded(!expanded)}>{props.room.roomName}</h3>
                <button className="btn join" onClick={(e) => handleJoin(e, props.room)}>Join</button>
            </div>
            <div className={`additional-info ${expanded && "expanded"}`}>
                <p>Room type: {roomType}</p>
                <p>Participants: <span>{usersInRoom}</span></p>
            </div>
            <div className={`modal ${showPassword && "show-modal"}`}>
                <div className="modal-inner">
                    <h3>Enter room password</h3>
                    <p>{props.room.roomName} is password protected, to join it you need to enter the
                        matching password.</p>
                    <form className="password-input" onSubmit={handleSubmit}>
                        <input type="password" value={password} placeholder="Room password"
                               onChange={(e) => setPassword(e.target.value)}/>
                        <span className="password-error">{formError}</span>
                        <div className="form-action">
                            <button className="btn">Join</button>
                            <button className="btn gray" onClick={(e) => setShowPassword(false)}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Room)