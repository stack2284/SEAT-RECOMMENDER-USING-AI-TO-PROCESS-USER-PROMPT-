const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    row: { type: String, required: true }, // e.g., "1", "2", "A", "B"
    column: { type: String, required: true }, // e.g., "A", "B", "C", "D", "E", "F"
    seatNumber: { type: String, required: true }, // e.g., "1A", "2B"
    seatType: { 
        type: String, 
        enum: ['window', 'aisle', 'middle'], 
        required: true 
    },
    side: { 
        type: String, 
        enum: ['left', 'right'], 
        required: true 
    },
    isAvailable: { type: Boolean, default: true }
});

const aircraftSchema = new mongoose.Schema({
    model: { type: String, required: true }, // e.g., "Boeing 737", "Airbus A320"
    airline: { type: String, required: true },
    totalRows: { type: Number, required: true },
    seatsPerRow: { type: Number, required: true },
    configuration: { type: String, required: true }, // e.g., "3-3", "2-3-2"
    seats: [seatSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Aircraft', aircraftSchema);
