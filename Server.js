const express = require("express");
var cors = require("cors");
const app = express();
const keys = require("./config/keys");
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
  .connect(keys.mongoURI, {
    useMongoClient: true,
    useNewUrlParser: true,
  })
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
  app.use(express.static("Frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolved(__dirname, "Frontend", "build", "index.html"));
  });
}

app.use("/", express.static(path.join(__dirname, "/frontend/build"))); //from net

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
