/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    userName: { type: 'string', required: true },
    password: {
      type: 'string',
      minLength: 6,
      required: true,
      columnName: "encryptedPassword"
    },
    confirmation: {
      type: 'string',
      minLength: 6,
      required: true,
    },
    admin: { type: 'boolean', defaultsTo: false },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true,
    },
    game: {
      model: 'gameRoom'
    },
    totalCash: {
      type: 'number',
      defaultsTo: 0
    },
    inPlayCash: {
      type: 'number',
    },
    bet: {
      type: 'number'
    },
  },
  customToJSON: function() {
    return _.omit(this, ['password', 'confirmation']);
  },

  beforeCreate: function(values, cb) {
    if (!values.password || values.password !== values.confirmation) {
      cb({
        err: 'Password does not match.'
      })
    }
    bcrypt.hash(values.password, 10, function (err, hash) {
      if (err) return cb(err);

      values.password = hash;
      values.confirmation = hash;
      cb();
    });
  },

  comparePassword: function(password, user) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, user.password, function (err, match) {
        if (err) reject(err);

        if (match) {
          resolve(true);
        } else {
          reject(err);
        }
      })
    });
  }



};
