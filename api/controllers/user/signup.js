const _ = require('lodash');

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
      required: true
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
    }
  },


  fn: async function (inputs, exits) {

    console.log(inputs);
    return;

  }


};
