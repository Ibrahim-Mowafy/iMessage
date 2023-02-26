import gql from 'graphql-tag';

const typeDefs = gql`
  type User {
    id: String
    name: String
    email: String
    emailVerified: String
    username: String
    image: String
  }

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
