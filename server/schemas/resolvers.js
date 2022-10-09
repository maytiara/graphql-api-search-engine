const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    
    // me (typeDefs)
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  
  Mutation: {

    // login (typeDefs)
    login: async (parent, { email, password }) => {
        const profile = await Profile.findOne({ email });

        // if the profile not found, will throw an alert message
        if (!profile) {
          throw new AuthenticationError('The email you entered did not match our records.');
        }
  
        const correctPw = await profile.isCorrectPassword(password);
        
        // if the password is incorrect, will throw an alert message
        if (!correctPw) {
          throw new AuthenticationError('Invalid password. Please double-check and try again.');
        }
  
        const token = signToken(profile);
        return { token, profile };
    },
  },
};

module.exports = resolvers;
