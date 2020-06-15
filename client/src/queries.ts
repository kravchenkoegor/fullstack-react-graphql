import { gql } from 'apollo-boost';

export const COUNT = gql`
  query {
    count
  }
`;

export const GET_USERS = gql`
  query GetUsers($skip: Int = 0, $limit: Int = 10) {
    users(skip: $skip, limit: $limit) @connection(key: "users") {
      id
      name
      email
      avatar
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
