// Import the necessary libraries
const express = require('express');
const router = express.Router();
const Orders = require('../models/orders'); // Import the Orders model

// POST request to add a new order
router.post('/', async (req, res) => {
    // Extract fields from request body
    const { 
        address: { addressId, address, lat, lng },
        appliedCoupon,
        driverId,
        deliverFee,
        discount,
        grandTotal,
        orderid,
        paymentMethod,
        paykey,
        chopsticks,
        status,
        date,
        userId,
        venueId
    } = req.body;
    
    // Create a new Orders object using the fields
    const newOrder = new Orders({
        address: { addressId, address, lat, lng },
        appliedCoupon,
        driverId,
        deliverFee,
        discount,
        grandTotal,
        orderid,
        paymentMethod,
        paykey,
        chopsticks,
        status,
        date,
        userId,
        venueId
    });

    try {
        // Save the new order to the database
        await newOrder.save();
        // Send back the new order with a 201 Created status
        res.status(201).json(newOrder);
    } catch (error) {
        // If an error occurs, send back a 400 Bad Request status
        res.status(400).json({ message: error.message });
    }
});

// GET request to retrieve all orders
router.get('/', async (req, res) => {
    try {
        // Retrieve all orders from the database
        const orders = await Orders.find();
        // Send back the list of orders
        res.json(orders);
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// GET request to retrieve a single order by order ID
router.get('/:orderid', async (req, res) => {
    try {
        // Find the order by the 'orderid' field
        const order = await Orders.findOne({ orderid: req.params.orderid });
        // If no order is found, send back a 404 Not Found status
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Send back the order
        res.json(order);
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// PUT request to update an order
router.put('/:orderid', async (req, res) => {
    try {
        // Find the order by the 'orderid' field and update it with the new values
        const updatedOrder = await Orders.findOneAndUpdate({ orderid: req.params.orderid }, req.body, { new: true });
        // If no order is found, send back a 404 Not Found status
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Send back the updated order
        res.json(updatedOrder);
    } catch (error) {
        // If an error occurs, send back a 400 Bad Request status
        res.status(400).json({ message: error.message });
    }
});

// DELETE request to delete an order by order ID
router.delete('/:orderid', async (req, res) => {
    try {
        // Find the order by the 'orderid' field and delete it
        const order = await Orders.findOneAndDelete({ orderid: req.params.orderid });
        // If no order is found, send back a 404 Not Found status
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Send back a confirmation message
        res.json({ message: 'Order deleted' });
    } catch (error) {
        // If an error occurs, send back a 500 Internal Server Error status
        res.status(500).json({ message: error.message });
    }
});

// Export the router for use in the main application file
module.exports = router;
