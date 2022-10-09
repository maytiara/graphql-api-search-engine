const jwt = require('jsonwebtoken'); // stateless jwt

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {

  // function for our authenticated routes
  // ({ req }) == incoming http req
  authMiddleware: function ({ req }) {

    // allows token to be sent via req.body, req.query, or headers
    // this is ${token} in client>src>App.js
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    // .split (split the readable obj to token)
    // .pop (gets the last string in an array)
    // .trim by getting the result value from .pop => this resulted to one line of string
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // if the token is not available, it will return the req but if the token exist then verify the jwt..
    if (!token) {
      return req;
    }

    // ..verify token and add the decoded user's data to the request so it can be accessed in the resolver
    // (decrypt) == .verify
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // this returns the data in graphQL
    return req;
  },

  // helper function to encrypt user's data
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // (encrypt) == .sign
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

// check the server > resolver.js  to check the authentication statement
