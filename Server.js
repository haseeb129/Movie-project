const express = require("express");
var cors = require("cors");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const movie = require("./routes/Movie");
const Schedule = require("./routes/Schedule");
const ticket = require("./routes/Ticket");
const user = require("./routes/User");
const path = require("path");
var ip = require("ip");
const port = process.env.Port || 5000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose
  .connect(
    process.env.MONGODB_URL ||
      "mongodb+srv://Haseeb:0000@movie-yjb6t.mongodb.net/test?retryWrites=true&w=majority",
    {
      useMongoClient: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));

var server = app.listen(port, () => {
  console.log(
    "Movie System Express server is running on " +
      ip.address() +
      ":" +
      server.address().port
  );
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolved(__dirname, "frontend", "build", "index.html"));
  });
}

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use(
  "/api/movie",
  function (req, res, next) {
    (req.serverAddress = ip.address() + ":" + server.address().port), next();
  },
  movie
);
app.use("/api/Schedule", Schedule);
app.use("/api/ticket", ticket);
app.use(
  "/api/user",
  function (req, res, next) {
    (req.serverAddress = ip.address() + ":" + server.address().port), next();
  },
  user
);
app.use("/api/login", user);
app.use("/", router);
