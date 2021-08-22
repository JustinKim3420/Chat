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
      username
      linked {
        user {
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
