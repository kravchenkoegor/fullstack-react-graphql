const mongoose = require('mongoose');
const md5 = require('md5');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  avatar: {
    type: String
  }
});

UserSchema.pre('save', function (next) {
  this.avatar = `https://gravatar.com/avatar/${md5(this.name)}?d=identicon`;
  next();
});

module.exports = mongoose.model('User', UserSchema);
