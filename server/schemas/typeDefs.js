const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  # fields required for search engine book
  
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Integer

    #array of book (type) 
    savedBooks: [Book]
  }

  type Book {
    #value returned fr. Google's book API
    bookId: String
    
    #array of strings, returns more than one author
    authors: [String]

    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!

    #references the user (type)
    user: User
  }

  type Query {

    #returns user (type)
    me: User
  }

  type Mutation {

    # this accepts email & pwd as (params) then returns Auth (type)
    login(email: String!, password: String!): Auth
    
    # this accepts username, email & pwd as (params) then returns Auth (type)
    addUser(username: String!, email: String!, password: String!): Auth

    # this accepts authors, desc, title, image, link & bookId(ID) as (params) then returns User (type)
    saveBook(authors: [String], description: String, title: String, bookId: String!, image: String, link: String): User

    # this accepts bookId(ID) as (params) then returns User (type)
    removeBook(bookId: String!): User
  }

`;

module.exports = typeDefs;
