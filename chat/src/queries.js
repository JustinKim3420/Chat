import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query currentUser {
    me {
      username
      linked {
        user {
          username
          _id
        }
        isFriend
        messages {
          sentUser{
            _id
          }
          message
          date
          _id
        }
      }
      email
      _id
    }
  }
`;

export const ALL_USERS = gql`
  query allUsers {
    allUsers {
      username
      _id
    }
  }
`;
