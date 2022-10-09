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

    # this accepts email & pwd as (params) then returns Auth (type)
    login(email: String!, password: String!): Auth
    
    # this accepts username, email & pwd as (params) then returns Auth (type)
    addUser(username: String!, email: String!, password: String!): Auth
  }

`;

module.exports = typeDefs;
