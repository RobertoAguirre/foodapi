// Import the necessary libraries
const express = require('express');
const router = express.Router();
const Chats = require('../models/chats'); // Import the Chats model

// POST request to add a new chat message
router.post('/', async (req, res) => {
    // Extract fields from request body
    const { from, to, msg } = req.body;
    
    // Create a new Chats object using the fields
    const newChat = new Chats({ from, to, msg, timestamp: Date.now() });

    try {
        // Save the new chat message to the database
        await newChat.save();
        // Send back the new chat message with a 201 Created status
        res.status(201).json(newChat);
    } catch (error) {
        // If an error occurs, send back a 400 Bad Request status
        res.status(400).json({ message: error.message });
    }
});

// GET request to retrieve all chat messages
router.get('/', async (req, res) => {
    try {
        // Retrieve all chat messages from the database
        const chats = await Chats.find().sort({ timestamp: -1 }); // Sorting by timestamp descending
        // Send back the list of chat messages
        res.json(chats);
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// GET request to retrieve chat messages between two users
router.get('/:from/:to', async (req, res) => {
    try {
        // Retrieve chat messages between the 'from' and 'to' users
        const messages = await Chats.find({
            $or: [
                { from: req.params.from, to: req.params.to },
                { from: req.params.to, to: req.params.from }
            ]
        }).sort({ timestamp: -1 }); // Sorting by timestamp descending
        // Send back the messages
        res.json(messages);
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// DELETE request to delete a chat message by ID
router.delete('/:id', async (req, res) => {
    try {
        // Find the chat message by ID and delete it
        const chat = await Chats.findByIdAndDelete(req.params.id);
        // If no chat message is found, send back a 404 Not Found status
        if (!chat) {
            return res.status(404).json({ message: 'Chat message not found' });
        }
        // Send back a confirmation message
        res.json({ message: 'Chat message deleted' });
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// Export the router for use in the main application file
module.exports = router;
