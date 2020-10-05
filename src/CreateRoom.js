import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import firebase from './firebase'
import {useCollectionData} from "react-firebase-hooks/firestore";
import Room from "./Room";
import UserPage from "./UserPage";

const firestore = firebase.firestore();

const CreateRoom = () => {
    const [showForm, setShowForm] = useState(false)
    const [roomName, setRoomName] = useState('')
    const [roomPassword, setRoomPassword] = useState('')
    const roomsRef = firestore.collection('rooms')
    const query = roomsRef.orderBy('createdAt')
    const [rooms] = useCollectionData(query, {idField: 'id'})

    const createRoom = async (e) => {
        e.preventDefault()
        if (roomName.trim().length > 0) {
            await roomsRef.add({
                roomName: roomName,
                roomPassword: roomPassword,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        setRoomName('')
        setRoomPassword('')
        setShowForm(false)
    }

    const handleChange = (e, setter) => {
        setter(e.target.value)
    }
    const handleCreate = (e) => {
        e.preventDefault()
        if (rooms.length < 5)
            setShowForm(true)
        else alert("Max. number of rooms reached.")
    }

    return (
        <UserPage>
            <div className="create-room-container">
                {!showForm && <div className="rooms">
                    {rooms && rooms.map(room => <Room key={room.id} room={room}/>)}
                    <button className="btn create-room" onClick={(e) => handleCreate(e)}>New room</button>
                </div>}
                {showForm && <form className="create-room-form" onSubmit={createRoom}>
                    <input value={roomName} name="room_name" type="text" placeholder="Room Name"
                           onChange={(e) => handleChange(e, setRoomName)}/>
                    <input value={roomPassword} name="room_password" type="text" placeholder="Room password"
                           onChange={(e) => handleChange(e, setRoomPassword)}/>
                    <div className="form-action">
                        <button type="submit" className="btn create-btn">Create</button>
                        <button className="btn cancel-btn" onClick={(e) => setShowForm(false)}>Cancel</button>
                    </div>
                </form>}
            </div>
        </UserPage>
    )
}

export default withRouter(CreateRoom)