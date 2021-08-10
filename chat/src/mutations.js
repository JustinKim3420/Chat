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
  mutation login($username:String!, $password:String!){
    login(
      username:$username,
      password:$password
    ){
      value
    }
  }
`