const Schedule = require("../modals/Schedule");
const express = require("express");
const router = express.Router();
const deleteShedule = require("../middleware/deleteShedule");

const checkAuth = require("../middleware/check-auth");
const isAdmin = require("../middleware/isAdmin");
const MovieServices = require("../ExtraFunctions/MovieServices");

router.get("/get", (req, res) => {
  Schedule.find({}, (err, Schedule) => {
    if (err) {
      res.send(err);
    } else {
      res.json(Schedule);
    }
  });
});

router.post("/post", checkAuth, isAdmin, deleteShedule, (req, res) => {
  const sample = new Schedule({
    date: req.body.date,
    slot1: req.body.slot1,
    slot2: req.body.slot2,
    slot3: req.body.slot3,
  });
  sample
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Filed missig" });
    });
});

router.post("/find", (req, res, next) => {
  Schedule.findOne({ date: req.body.date })
    .exec()
    .then((date) => {
      if (!date) res.json("");
      else {
        res.json(date);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/scheduleList", async (req, res) => {
  await Schedule.find({}, (err, Schedule) => {
    if (err) {
      res.send(err);
    } else {
      fun = async () => {
        movies = await MovieServices.getmoviearray();
        if (
          typeof Schedule !== "undefined" &&
          Schedule !== null &&
          Schedule.length > 0
        ) {
          for (i = 0; i < Schedule.length; i++) {
            Schedule[i].slot1 = await MovieServices.findmoviebyid(
              Schedule[i].slot1,
              movies
            );
            Schedule[i].slot2 = await MovieServices.findmoviebyid(
              Schedule[i].slot2,
              movies
            );
            Schedule[i].slot3 = await MovieServices.findmoviebyid(
              Schedule[i].slot3,
              movies
            );
          }
        }
        await res.json(Schedule);
      };
      fun();
    }
  });
});

router.delete("/delete/:id", checkAuth, isAdmin, async (req, res) => {
  const id = req.params.id;

  await Schedule.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
