const _ = require('lodash');
const bcrypt = require('bcrypt');

module.exports = {

  friendlyName: 'Signup',

  description: 'Signup user.',

  inputs: {
    firstName: {
      description: 'The first name of the User',
      type: 'string',
      required: true
    },
    lastName: {
      description: 'The last name of the User',
      type: 'string',
      required: true
    },
    userName: {
      description: 'The UserName of the User',
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      minLength: 6,
      protected: true,
      required: true,
    },
    confirmation: {
      type: 'string',
      minLength: 6,
      protected: true,
      required: true,
    },
    admin: {
      type: 'boolean',
      defaultsTo: false
    },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true
    }
  },


  exits: {
    success: {
      responseStatus: 200
    },
    notAuthorized: {
      responseStatus: 403,
      message: 'Please be advised you are not authorized to be Admin based on the credentials you have entered'
    },
    badRequest: {
      responseStatus: 404,
      message: 'Please be sure that the password and confirmation password are same'
    }
  },


  fn: async function (inputs, exits) {

    const { password, confirmation, email } = inputs;

    if (password !== confirmation) {
      return exits.badRequest({
        message: 'Please be sure that the password and confirmation password are same'
      })
    }

    let result;
    try {
      await User.create({...inputs})
        .then(res => User.findOne({ email })
        .then(response => result = response))
    } catch (err) {
      console.log(err);
    }

    return exits.success(result);

  }


};
