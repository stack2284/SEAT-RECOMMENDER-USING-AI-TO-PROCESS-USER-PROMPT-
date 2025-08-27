const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true },
    airline: { type: String, required: true },
    departure: {
        city: { type: String, required: true },
        airport: { type: String, required: true },
        time: { type: Date, required: true }
    },
    arrival: {
        city: { type: String, required: true },
        airport: { type: String, required: true },
        time: { type: Date, required: true }
    },
    aircraft: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Aircraft', 
        required: true 
    },
    route: {
        type: { type: String, enum: ['domestic', 'international'], required: true },
        distance: { type: Number }, // in kilometers
        direction: { type: String, enum: ['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest'] }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flight', flightSchema);
