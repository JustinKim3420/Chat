import { gql } from "@apollo/client";

export const MESSAGE_SENT = gql`
  subscription onMessageSend {
    messageSent {
      _id
      sentUser {
        _id
      }
      toFriendID
      message
      date
    }
  }
`;

export const FRIEND_ADDED = gql`
  subscription onFriendAdded {
    friendAdded {
      linked {
        user {
          username
          _id
        }
        isFriend
        messages {
          message
          date
        }
      }
    }
  }
`;

export const FRIEND_DELETED = gql`
  subscription onFriendDeleted {
    friendAdded {
      linked {
        user {
          username
          _id
        }
        isFriend
        messages {
          message
          date
        }
      }
    }
  }
`;
