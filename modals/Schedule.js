const mongoose = require("mongoose");
const Schedule = mongoose.Schema({
  date: {
    type: String,
    required: true,
    maxlength: 12,
    minlength: 5,
  },
  slot1: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  slot2: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
  slot3: {
    type: String,
    minlength: 3,
    maxlength: 50,
  },
});
module.exports = mongoose.model("Schedule", Schedule);
