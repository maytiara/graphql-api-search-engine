const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  # fields required for search engine book
  
  type User {

  }

  type Book {

  }

  type Auth {

  }

  type Query {
    me: User
  }

  type Mutation {

    # this accepts an email & pwd as (params) then returns Auth (type)
    login(email: String!, passwords: String!): Auth
    
  }

`;

module.exports = typeDefs;
