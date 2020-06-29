const Ticket = require("../modals/Ticket");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const isAdmin = require("../middleware/isAdmin");

router.get("/get", (req, res) => {
  Ticket.find({}, (err, Ticket) => {
    if (err) {
      res.send(err);
    } else {
      res.json(Ticket);
    }
  });
});
router.post("/post", (req, res) => {
  const sample = new Ticket({
    Customer_id: req.body._id,
    Customer: req.body.FirstName,
    Email: req.body.Email,
    Name: req.body.Name,
    Date: req.body.Selected_date,
    Slot: req.body.Selected_slot,
    Screen: req.body.Screen,
    Seats: req.body.Seats,
    Price: req.body.Total_price,
  });
  sample
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(401).json({ message: "Sorry could not make the Booking" });
    });
});

router.delete("/:id", checkAuth, async (req, res) => {
  const id = req.params.id;
  Ticket.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Sorry could Not Delete" });
    });
});

router.delete("/usertickets/:id", async (req, res) => {
  const id = req.params.id;
  Ticket.remove({ Customer_id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err, message: "Sorry could Not Delete" });
    });
});
module.exports = router;
