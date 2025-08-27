require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors()); // Allows frontend to make requests to backend
app.use(express.json()); // Parses JSON request bodies

// MongoDB Connection
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Air Travel Seat Recommender API is running!' });
});

// Import and use routes
const seatRoutes = require('./routes/seats');
const flightRoutes = require('./routes/flights');
const aiRoutes = require('./routes/ai');

app.use('/api/seats', seatRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/ai', aiRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
