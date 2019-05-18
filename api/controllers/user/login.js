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
    notFound: {
      responseStatus: 404,
      message: 'The User was not found'
    },
    success: {
      responseStatus: 200,
    }
  },


  fn: async function (inputs, exits) {
    const { userName, password } = inputs;
    // All done.
    // bcrypt.compare(inputs.password,, function(err, result) {
    //   if (result) {
    //     return exits.json({
    //       user: user,
    //       token: jwToken.sign(user)
    //     });
    //   } else {
    //     return exits.forbidden({ err: 'Email and password combination do not match' });
    //   }
    // });
    const user = await User.findOne({ userName });
  
    if (!user) {
      exits.notFound({
        message: 'Please double check your credentials'
      });
    }

    bcrypt.compare(inputs.password, user.password, function (err, result, cb) {
      if (err) return console.log(err);

      if (result) {
        cb()
      } else {
          return exits.forbidden({
            err: 'UserName and password combination do not match'
          })
      }

    });


    exits.success(user);

  }


};
