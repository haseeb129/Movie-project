const validate = require("../models/Cinema");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const cinema = await Cinema.find().sort("name");
  res.send(cinema);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cinema = new Cinema({
    Name: req.body.Name,
    Address: req.body.Address,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Location: req.body.Location,
    Facilities: req.body.Facilities,
    Picture: req.body.Picture
  });
  await cinema.save();

  res.send(cinema);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cinema = await Cinema.findByIdAndUpdate(
    req.params.id,
    {
      Name: req.body.Name,
      Address: req.body.Address,

      Email: req.body.Email,
      Phone: req.body.Phone,
      Location: req.body.Location,
      Facilities: req.body.Facilities,
      Picture: req.body.Picture
    },
    { new: true }
  );

  if (!cinema)
    return res.status(404).send("The cinema with the given ID was not found.");

  res.send(cinema);
});

router.delete("/:id", async (req, res) => {
  const cinema = await Cinema.findByIdAndRemove(req.params.id);

  if (!cinema)
    return res.status(404).send("The cinema with the given ID was not found.");

  res.send(cinema);
});

router.get("/:id", async (req, res) => {
  const cinema = await Cinema.findById(req.params.id);

  if (!cinema)
    return res.status(404).send("The cinema with the given ID was not found.");

  res.send(cinema);
});

module.exports = router;
