// Import the necessary libraries
const express = require('express');
const router = express.Router();
const Driverreviews = require('../models/driverreviews'); // Import the Driverreviews model

// POST request to add a new driver review
router.post('/', async (req, res) => {
    // Extract fields from request body
    const { date, descriptions, driverId, rating, user } = req.body;
    
    // Create a new Driverreviews object using the fields
    const newDriverReview = new Driverreviews({ date, descriptions, driverId, rating, user });

    try {
        // Save the new driver review to the database
        await newDriverReview.save();
        // Send back the new driver review with a 201 Created status
        res.status(201).json(newDriverReview);
    } catch (error) {
        // If an error occurs, send back a 400 Bad Request status
        res.status(400).json({ message: error.message });
    }
});

// GET request to retrieve all driver reviews
router.get('/', async (req, res) => {
    try {
        // Retrieve all driver reviews from the database
        const driverReviews = await Driverreviews.find();
        // Send back the list of driver reviews
        res.json(driverReviews);
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// GET request to retrieve driver reviews by driver ID
router.get('/:driverId', async (req, res) => {
    try {
        // Retrieve reviews for a specific driver using the driverId
        const reviews = await Driverreviews.find({ driverId: req.params.driverId });
        // Send back the driver reviews
        res.json(reviews);
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// PUT request to update a driver review
router.put('/:id', async (req, res) => {
    try {
        // Find the driver review by ID and update it with the new values
        const updatedReview = await Driverreviews.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // If no review is found, send back a 404 Not Found status
        if (!updatedReview) {
            return res.status(404).json({ message: 'Driver review not found' });
        }
        // Send back the updated driver review
        res.json(updatedReview);
    } catch (error) {
        // If an error occurs, send back a 400 Bad Request status
        res.status(400).json({ message: error.message });
    }
});

// DELETE request to delete a driver review by ID
router.delete('/:id', async (req, res) => {
    try {
        // Find the driver review by ID and delete it
        const review = await Driverreviews.findByIdAndDelete(req.params.id);
        // If no review is found, send back a 404 Not Found status
        if (!review) {
            return res.status(404).json({ message: 'Driver review not found' });
        }
        // Send back a confirmation message
        res.json({ message: 'Driver review deleted' });
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// Export the router for use in the main application file
module.exports = router;
