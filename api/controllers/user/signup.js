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
    badRequest: {
      responseStatus: 404,
      message: 'Please be sure that the password and confirmation password are same'
    }
  },


  fn: async function (inputs, exits) {

    let { password, confirmation } = inputs;

    if (password !== confirmation) {
      return exits.badRequest({
        message: 'Please be sure that the password and confirmation password are same'
      })
    } 


    const newUser = await User.create({
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      userName: inputs.userName,
      password: password,
      confirmation: confirmation,
      email: inputs.email
    })

    console.log(newUser);

    return exits.success(newUser);

  }


};
