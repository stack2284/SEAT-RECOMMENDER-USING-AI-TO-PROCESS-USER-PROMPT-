const express = require('express');
const router = express.Router();
const Aircraft = require('../models/Aircraft');

// Get all aircraft with their seat layouts
router.get('/aircraft', async (req, res) => {
    try {
        const aircraft = await Aircraft.find().populate('seats');
        res.json(aircraft);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get specific aircraft by ID
router.get('/aircraft/:id', async (req, res) => {
    try {
        const aircraft = await Aircraft.findById(req.params.id).populate('seats');
        if (!aircraft) {
            return res.status(404).json({ message: 'Aircraft not found' });
        }
        res.json(aircraft);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get seat recommendations based on preferences
router.post('/recommendations', async (req, res) => {
    try {
        const { aircraftId, preference, flightDirection, departureTime } = req.body;
        
        const aircraft = await Aircraft.findById(aircraftId);
        if (!aircraft) {
            return res.status(404).json({ message: 'Aircraft not found' });
        }

        // Simple recommendation logic (we'll enhance this later)
        let recommendedSeats = aircraft.seats.filter(seat => {
            if (preference === 'sunrise') {
                // For sunrise, prefer left side (assuming eastward flight)
                return seat.side === 'left' && seat.seatType === 'window';
            } else if (preference === 'sunset') {
                // For sunset, prefer right side (assuming westward flight)
                return seat.side === 'right' && seat.seatType === 'window';
            }
            return seat.seatType === 'window'; // Default to window seats
        });

        // Limit to top 5 recommendations
        recommendedSeats = recommendedSeats.slice(0, 5);

        res.json({
            aircraft: aircraft.model,
            preference,
            recommendations: recommendedSeats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
