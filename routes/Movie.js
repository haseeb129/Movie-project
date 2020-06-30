const Movie = require("../modals/Movie");
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const validateMovie = require("../middleware/validateMovie");
const isAdmin = require("../middleware/isAdmin");
const ScheduleServices = require("../ExtraFunctions/ScheduleServices");
const ImageServices = require("../ExtraFunctions/ImageServices");

let address = "http://localhost:5000/";

router.post(
  "/post1122",
  ImageServices.upload.single("file"),
  validateMovie,
  checkAuth,
  isAdmin,
  (req, res, next) => {
    const sample = new Movie({
      Name: req.body.Name,
      Director: req.body.Director,
      Cast: req.body.Cast,
      imagefile: address.concat(req.file.path),
      Platinum: req.body.Platinum,
      Gold: req.body.Gold,
      Silver: req.body.Silver,
    });
    sample
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        err
          .status(401)
          .json({ message: "Authentication failed In movie Updation" });
      });
  }
);

router.put(
  "/update/:id",
  validateMovie,
  checkAuth,
  isAdmin,
  async (req, res) => {
    const id = req.params.id;
    console.log("this is put", req.body);
    await Movie.findOneAndUpdate(
      { _id: id },
      {
        Name: req.body.Name,
        Director: req.body.Director,
        Cast: req.body.Cast,
        imagefile: req.body.Picture,
        Platinum: req.body.Platinum,
        Gold: req.body.Gold,
        Silver: req.body.Silver,
      }
    )
      .then((data) => {
        if (!data && data.length < 1) {
          return res.status(401).json({ message: "No Movie record Found  " });
        } else res.status(200).json({ message: "Updation successful" });
      })
      .catch((err) =>
        err
          .status(401)
          .json({ message: "Authentication failed In movie Updation" })
      );
  }
);

//perfect
router.delete("/delete/:id", checkAuth, isAdmin, async (req, res) => {
  const id = req.params.id;
  await Movie.findByIdAndRemove({ _id: id })
    .exec()
    .then(async (result) => {
      await ScheduleServices.updateSchedule(id);
      await ImageServices.removeImagefile(result.imagefile);
      await res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//perfect
router.get("/get", (req, res) => {
  Movie.find({}, (err, User) => {
    if (err) {
      res.send(err);
    } else {
      res.json(User);
    }
  });
});
module.exports = router;
