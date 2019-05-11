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
      protected: true,
      required: true,
      columnName: "encryptedPassword"
    },
    confirmation: {
      type: 'string',
      minLength: 6,
      protected: true,
      required: true,
      columnName: "encryptedPassword"
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
    }
  },
  toJSON: function() {
    let obj = this.toObject();
    delete obj.password;
    delete obj.confirmation;
  },
  beforeCreate: function(values, cb) {
    bcrypt.hash(values.password, 10, function (err, hash) {
      if (err) return cb(err);

      values.password = hash;
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
