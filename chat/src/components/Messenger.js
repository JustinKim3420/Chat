import React, {useState} from 'react'
import FriendsList from './FriendsList'
import Messages from './Messages'
import './Messenger.css'

const Messenger = ({currentUser})=>{
    const [focusedUser, setFocusedUser] = useState()
    if(!currentUser.linked){
        return null
    }

    return(
        <div className='container flex-fill overflow-hidden flex-row'>
            <FriendsList linkedUsers={currentUser.linked} setFocusedUser={setFocusedUser}/>
            <Messages/>
        </div>
    )
}

export default Messenger