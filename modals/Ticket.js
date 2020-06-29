const mongoose = require("mongoose");
const Ticket = mongoose.Schema({
  Customer_id: String,
  Customer: String,
  Email: String,
  Name: String,
  Date: String,
  Slot: String,
  Screen: String,
  Seats: Number,
  Price: Number
});
module.exports = mongoose.model("Ticket", Ticket);
