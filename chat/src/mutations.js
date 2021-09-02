import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      username
      email
      _id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendUsername: String!) {
    addFriend(friendUsername: $friendUsername) {
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

export const DELETE_FRIEND = gql`
  mutation deleteFriend($friendUsername: String!) {
    deleteFriend(friendUsername: $friendUsername) {
      username
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

export const SEND_MESSAGE = gql`
  mutation sendMessage($message:String!, $friendUsername:String!){
    sendMessage(
      message:$message,
      friendUsername:$friendUsername
    ){ 
      _id
      sentUser{
        _id
      }
      message
      date
    }
  }
`
