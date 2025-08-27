const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// AI-powered seat recommendations endpoint
router.post('/recommendations', async (req, res) => {
  try {
    const { flightData, aircraftData, userPreferences, customPrompt } = req.body;

    // Validate required data
    if (!flightData || !aircraftData || !userPreferences) {
      return res.status(400).json({ 
        error: 'Missing required data: flightData, aircraftData, or userPreferences' 
      });
    }

    // Get AI recommendations, now passing customPrompt
    const recommendations = await aiService.getSeatRecommendations(
      flightData, 
      aircraftData, 
      userPreferences,
      customPrompt
    );

    if (recommendations) {
      res.json(recommendations);
    } else {
      // Fallback recommendations if AI fails
      const fallback = aiService.getFallbackRecommendations(
        flightData, 
        aircraftData, 
        userPreferences
      );
      res.json(fallback);
    }

  } catch (error) {
    console.error('AI recommendations error:', error);
    // Return fallback recommendations on error
    try {
      const { flightData, aircraftData, userPreferences } = req.body;
      const fallback = aiService.getFallbackRecommendations(
        flightData, 
        aircraftData, 
        userPreferences
      );
      res.json(fallback);
    } catch (fallbackError) {
      res.status(500).json({ 
        error: 'Failed to generate recommendations',
        message: 'Please try again later'
      });
    }
  }
});

module.exports = router;
