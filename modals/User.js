const mongoose = require("mongoose");
const Users = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  LastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  Phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  Password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 30,
  },

  Picture: String,
  admin: Boolean,
});
module.exports = mongoose.model("User", Users);
