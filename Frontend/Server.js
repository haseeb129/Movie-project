const mongoURI = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const keys = require("../config/keys");
app.use(express.json());

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Db Connected from Frontend");
  })
  .catch((err) => console.log(err));

const port = process.env.Port;
app.listen(port, async () => {
  console.log(`From FrontEnd Listining on port ${port}`);
});
