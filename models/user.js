var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
//var mongodb = require('./db');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  verifyId: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  head: String,
  message: Array,
  read: Number
}, {
  collection: 'user'
});

var userModel = mongoose.model('User', userSchema);

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.statics.message = function(username, message, callback) {
  userModel.update({
    name: username
  }, {
    $push: {
      message: message
    }
  }, {
    safe: true,
    upsert: true
  }, function(err) {
    if (err) {
      console.log(err);
      callback(err);
    }
    callback(null);
  })
};

module.exports = mongoose.model('User', userSchema);
