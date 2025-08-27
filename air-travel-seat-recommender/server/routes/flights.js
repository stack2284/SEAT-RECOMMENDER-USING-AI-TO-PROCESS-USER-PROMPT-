const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// Get all flights
router.get('/', async (req, res) => {
    try {
        const flights = await Flight.find().populate('aircraft');
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get flight by ID
router.get('/:id', async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id).populate('aircraft');
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        res.json(flight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get flights between two cities
router.get('/route/:departure/:arrival', async (req, res) => {
    try {
        const { departure, arrival } = req.params;
        const flights = await Flight.find({
            'departure.city': departure,
            'arrival.city': arrival
        }).populate('aircraft');
        
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new flight (for testing purposes)
router.post('/', async (req, res) => {
    try {
        const flight = new Flight(req.body);
        const newFlight = await flight.save();
        res.status(201).json(newFlight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
