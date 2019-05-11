const bcrypt = require('bcrypt');

module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    userName: {
      description: 'The UserName of the User',
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      minLength: 6,
      protected: true,
      required: true,
    },
  },


  exits: {
    forbidden: {
      responseType: 'forbidden',
      message: 'Message is Forbidden'
    },
    success: {
      responseStatus: 200,
    }
  },


  fn: async function (inputs) {
    const { user } = this.req;
    // All done.
    bcrypt.compare(inputs.password, user.encrypredPassword, function(err, result) {
      if (result) {
        return exits.json({
          user: user,
          token: jwToken.sign(user)
        });
      } else {
        return exits.forbidden({ err: 'Email and password combination do not match' });
      }
    });


  }


};
