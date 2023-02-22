import { gql } from 'apollo-server-core';

const typeDefs = gql`
  type searchedUser {
    id: String
    username: String
  }

  type Query {
    searchUsers(username: String!): [searchedUser]
  }

  type Mutation {
    createUsername(username: String!): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
