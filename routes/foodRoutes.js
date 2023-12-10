// Import the necessary libraries
const express = require('express');
const router = express.Router();
const Food = require('../models/food'); // Import the Food model

// POST request to add a new food item
router.post('/', async (req, res) => {
    // Extract fields from request body
    const { cover, desc, id, name, price, rating, size, status, uid, variations } = req.body;
    
    // Create a new Food object using the fields
    const newFood = new Food({ cover, desc, id, name, price, rating, size, status, uid, variations });

    try {
        // Save the new food item to the database
        await newFood.save();
        // Send back the new food item with a 201 Created status
        res.status(201).json(newFood);
    } catch (error) {
        // If an error occurs, send back a 400 Bad Request status
        res.status(400).json({ message: error.message });
    }
});

// GET request to retrieve all food items
router.get('/', async (req, res) => {
    try {
        // Retrieve all food items from the database
        const foods = await Food.find();
        // Send back the list of food items
        res.json(foods);
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// GET request to retrieve a single food item by ID
router.get('/:id', async (req, res) => {
    try {
        // Find the food item by the custom 'id' field
        const foodItem = await Food.findOne({ id: req.params.id });
        // If no food item is found, send back a 404 Not Found status
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        // Send back the food item
        res.json(foodItem);
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// PUT request to update a food item
router.put('/:id', async (req, res) => {
    try {
        // Find the food item by the custom 'id' field and update it with the new values
        const updatedFood = await Food.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        // If no food item is found, send back a 404 Not Found status
        if (!updatedFood) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        // Send back the updated food item
        res.json(updatedFood);
    } catch (error) {
        // If an error occurs, send back a 400 Bad Request status
        res.status(400).json({ message: error.message });
    }
});

// DELETE request to delete a food item by ID
router.delete('/:id', async (req, res) => {
    try {
        // Find the food item by the custom 'id' field and delete it
        const foodItem = await Food.findOneAndDelete({ id: req.params.id });
        // If no food item is found, send back a 404 Not Found status
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        // Send back a confirmation message
        res.json({ message: 'Food item deleted' });
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// Export the router for use in the main application file
module.exports = router;
