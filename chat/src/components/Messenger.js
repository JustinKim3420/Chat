import React from 'react'
import FriendsList from './FriendsList'
import Messages from './Messages'
import './Messenger.css'

const Messenger = ()=>{
    return(
        <div className='container flex-fill overflow-hidden flex-row'>
            <FriendsList />
            <Messages />
        </div>
    )
}

export default Messenger