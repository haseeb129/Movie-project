const User = require("../modals/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validateUser = require("../middleware/validateUser");
const checkAuth = require("../middleware/check-auth");
const isAdmin = require("../middleware/isAdmin");
const ScheduleServices = require("../ExtraFunctions/ScheduleServices");
const ImageServices = require("../ExtraFunctions/ImageServices");
const JWTServices = require("../ExtraFunctions/JWTServices");

router.get("/get", (req, res) => {
  User.find({}, (err, User) => {
    if (err) {
      res.send(err);
    } else {
      res.json(User);
    }
  });
});
let address = "http://localhost:5000/";

router.post(
  "/signUp",
  ImageServices.upload.single("file"),
  validateUser,
  (req, res, next) => {
    User.findOne({ Email: req.body.Email })
      .exec()
      .then((user) => {
        if (user) {
          return err.status(409).json({ message: "User Already Exist" });
        } else {
          bcrypt.hash(req.body.Password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({ message: "Error in Password" });
            } else {
              const sample = new User({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Email: req.body.Email,
                Phone: req.body.Phone,
                Password: hash,
                Picture: address.concat(req.file.path),
                admin: "false",
              });
              sample
                .save()
                .then(async (result) => {
                  const token = await JWTServices.JWTcreate(result);
                  await res.setHeader("x-auth-token", token);
                  res
                    .header("access-control-expose-headers", "x-auth-token")
                    .status(201)
                    .json({ result }); //also can sent token in the body
                })
                .catch((err) => {
                  err.status(500).json({ message: "User Already Exist" });
                });
            }
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "User Already Exist" });
      });
  }
);

router.post("/signIn", async (req, res, next) => {
  await User.findOne({ Email: req.body.Email })
    .exec()
    .then((user) => {
      if (!user && user.length < 1) {
        return res.status(401).json({ message: "Authentication Failed " });
      } else {
        bcrypt.compare(
          req.body.Password,
          user.Password,
          async (err, result) => {
            if (err) {
              return err.status(401).json({ message: "Authentication Failed" });
            }
            if (result) {
              const token = await JWTServices.JWTcreate(user);
              return await res
                .status(200)
                .json({ token: token, message: "Successfull" });
            }
            return res.status(401).json({ message: "Invalid Password" });
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "No User Found Please SignUp First " });
    });
});

router.delete("/:id", checkAuth, isAdmin, async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndRemove({ _id: id })
    .exec()
    .then(async (result) => {
      await ScheduleServices.removetickets(id);
      await ImageServices.removeImagefile(result.Picture);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
