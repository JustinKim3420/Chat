import {gql} from '@apollo/client'

export const MESSAGE_SENT = gql`
    subscription onMessageSend{
        messageSent{
            _id
            sentUser{
                _id
            }
            toFriendID
            message
            date
        }
    }
`