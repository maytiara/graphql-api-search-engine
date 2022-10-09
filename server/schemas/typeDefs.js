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

    # this accepts authors, desc, title, image, link & bookId(ID) as (params) then returns User (type)
    saveBook(authors: [String]!, description: String!, title: String!, bookId: ID!, image: String!, link: String!): User

    # this accepts bookId(ID) as (params) then returns User (type)
    removeBook(bookId: ID!): User
  }

`;

module.exports = typeDefs;
