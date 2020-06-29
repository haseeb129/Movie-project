const mongoURI = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Db connected");
  })
  .catch(err => console.log(err));

const port = process.env.PORT;
app.listen(port, function() {
  console.log(`Listining on port ${port}`);
});
