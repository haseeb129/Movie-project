const mongoose = require("mongoose");
const Movie = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  Director: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  Cast: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  imagefile: { type: String },

  Platinum: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  Gold: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  Silver: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
});
module.exports = mongoose.model("Movie", Movie);
