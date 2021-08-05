import React from 'react'

const Messages = ()=>{
    return(
        <div className="full-height messages ps-3">
            <div className='chat'>
                <span>hello world</span>
            </div>
            <div className='send-message-area'>
                <textarea className='message-input'></textarea>
                <button className='send-button'>Send</button>
            </div>
        </div>
    )
}

export default Messages