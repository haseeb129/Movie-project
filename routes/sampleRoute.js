const sampleModal = require("../modals/sampleModal");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/get", (req, res) => {
  sampleModal.find({}, (err, sampleModal) => {
    if (err) {
      res.send(err);
    } else {
      res.json(sampleModal);
    }
  });
});

router.post("/post", (req, res) => {
  const sample = new sampleModal({
    Name: req.body.Name,
  });
  sample
    .save()
    .then((result) => {
      console.log("Hello", req.body);
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  sampleModal
    .update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  sampleModal
    .remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  sampleModal
    .findById(id)
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "no valid entry found " });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
module.exports = router;
