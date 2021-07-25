import React from 'react'
import {Alert} from 'react-bootstrap'

const Notification = ({message, variant})=>{
    
    return(
        <div className={message? '':'d-none'}>
            <Alert variant={variant}>
                {message}
            </Alert>
        </div>
    )
}

export default Notification