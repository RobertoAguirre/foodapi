const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Dish = require("../models/dish");

// Require the db.js file to connect to the database
require("../db");

// Define the routes
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getDish, (req, res) => {
  res.json(res.dish);
});

router.post("/", async (req, res) => {
  const dish = new Dish({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
  });

  try {
    const newDish = await dish.save(); // Save the dish to the database
    res.status(201).json(newDish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getDish, async (req, res) => {
  if (req.body.name != null) {
    res.dish.name = req.body.name;
  }
  if (req.body.category != null) {
    res.dish.category = req.body.category;
  }
  if (req.body.description != null) {
    res.dish.description = req.body.description;
  }
  if (req.body.price != null) {
    res.dish.price = req.body.price;
  }
  try {
    const updatedDish = await res.dish.save(); // Save the updated dish to the database
    res.json(updatedDish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getDish, async (req, res) => {
  try {
    await res.dish.remove(); // Remove the dish from the database
    res.json({ message: "Deleted Dish" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single dish by ID
async function getDish(req, res, next) {
  let dish;
  try {
    dish = await Dish.findById(req.params.id);
    if (dish == null) {
      return res.status(404).json({ message: "Cannot find dish" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.dish = dish;
  next();
}

module.exports = router;
