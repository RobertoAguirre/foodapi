// Import the necessary libraries
const express = require('express');
const router = express.Router();
const Address = require('../models/address'); // Import the Address model

// POST request to add a new address
router.post('/', async (req, res) => {
    // Extract fields from request body
    const { address, city, interfon, landmark, lat, lng, title } = req.body;
    
    // Create a new Address object using the fields
    const newAddress = new Address({ address, city, interfon, landmark, lat, lng, title });

    try {
        // Save the new address to the database
        await newAddress.save();
        // Send back the new address with a 201 Created status
        res.status(201).json(newAddress);
    } catch (error) {
        // If an error occurs, send back a 400 Bad Request status
        res.status(400).json({ message: error.message });
    }
});

// GET request to retrieve all addresses
router.get('/', async (req, res) => {
    try {
        // Retrieve all addresses from the database
        const addresses = await Address.find();
        // Send back the list of addresses
        res.json(addresses);
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// GET request to retrieve a single address by ID
router.get('/:id', async (req, res) => {
    try {
        // Find the address by ID provided in the route parameter
        const address = await Address.findById(req.params.id);
        // If no address is found, send back a 404 Not Found status
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        // Send back the address
        res.json(address);
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// PUT request to update an address
router.put('/:id', async (req, res) => {
    try {
        // Find the address by ID and update it with the new values
        const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // If no address is found, send back a 404 Not Found status
        if (!updatedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }
        // Send back the updated address
        res.json(updatedAddress);
    } catch (error) {
        // If an error occurs, send back a 400 Bad Request status
        res.status(400).json({ message: error.message });
    }
});

// DELETE request to delete an address
router.delete('/:id', async (req, res) => {
    try {
        // Find the address by ID and delete it
        const address = await Address.findByIdAndDelete(req.params.id);
        // If no address is found, send back a 404 Not Found status
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        // Send back a confirmation message
        res.json({ message: 'Address deleted' });
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// Export the router for use in the main application file
module.exports = router;
