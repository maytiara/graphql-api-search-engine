const { AuthenticationError } = require('apollo-server-express'); // this will return "code": "UNAUTHENTICATED"
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    
    // me (typeDefs)
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  
  Mutation: {

    // login (typeDefs)
    login: async (parent, { email, password }) => {

        // find the user by provided email add
        const user = await User.findOne({ email });

        // if the user with the provided email add not found, will throw an alert message
        if (!user) {
          throw new AuthenticationError('The email you entered did not match our records.');
        }
        const correctPw = await user.isCorrectPassword(password);
        
        // if the password is incorrect, will throw an alert message
        if (!correctPw) {
          throw new AuthenticationError('Invalid password. Please double-check and try again.');
        }

        // If email and password are correct, sign user into the application with a JWT
        const token = signToken(user);

        // this return an Auth obj (signed token) & user's (email & pwd)
        return { token, user };
    },

    // addUser (typeDefs)
    addUser: async (parent, { username, email, password }) => {
      // create the user
      const user = await User.create({ username, email, password });

      //JWT created and logged the user after creating a new account
      const token = signToken(user);
      return { token, user };
    },

    // saveBook (typeDefs)
    saveBook: async (parent, { authors, description, title, bookId, image, link }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: {authors, description, title, bookId, image,link } } },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    // removeBook (typeDefs)
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
