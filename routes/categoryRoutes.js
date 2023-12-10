// Import the necessary libraries
const express = require('express');
const router = express.Router();
const Category = require('../models/category'); // Import the Category model

// POST request to add a new category
router.post('/', async (req, res) => {
    // Extract fields from request body
    const { name, show } = req.body;
    
    // Create a new Category object using the fields
    const newCategory = new Category({ name, show });

    try {
        // Save the new category to the database
        await newCategory.save();
        // Send back the new category with a 201 Created status
        res.status(201).json(newCategory);
    } catch (error) {
        // If an error occurs, send back a 400 Bad Request status
        res.status(400).json({ message: error.message });
    }
});

// GET request to retrieve all categories
router.get('/', async (req, res) => {
    try {
        // Retrieve all categories from the database
        const categories = await Category.find();
        // Send back the list of categories
        res.json(categories);
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// GET request to retrieve a single category by ID
router.get('/:id', async (req, res) => {
    try {
        // Find the category by ID provided in the route parameter
        const category = await Category.findById(req.params.id);
        // If no category is found, send back a 404 Not Found status
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        // Send back the category
        res.json(category);
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// PUT request to update a category
router.put('/:id', async (req, res) => {
    try {
        // Find the category by ID and update it with the new values
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // If no category is found, send back a 404 Not Found status
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        // Send back the updated category
        res.json(updatedCategory);
    } catch (error) {
        // If an error occurs, send back a 400 Bad Request status
        res.status(400).json({ message: error.message });
    }
});

// DELETE request to delete a category
router.delete('/:id', async (req, res) => {
    try {
        // Find the category by ID and delete it
        const category = await Category.findByIdAndDelete(req.params.id);
        // If no category is found, send back a 404 Not Found status
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        // Send back a confirmation message
        res.json({ message: 'Category deleted' });
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// Export the router for use in the main application file
module.exports = router;
