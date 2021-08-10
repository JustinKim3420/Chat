import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query currentUser {
    me {
      username
      linked {
        user {
          username
        }
        isFriend
      }
      email
      _id
    }
  }
`;

export const USER_NUMBERS = gql`
  query numberOfUsers {
    userCount
  }
`;
