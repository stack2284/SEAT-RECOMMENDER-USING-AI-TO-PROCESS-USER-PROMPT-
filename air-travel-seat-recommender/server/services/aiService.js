const axios = require('axios');

// Hugging Face API configuration - API key is safely hidden in backend
const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct';
const API_KEY = process.env.HUGGING_FACE_API_KEY;

// AI service for seat recommendations
class AIService {
  constructor() {
    this.apiKey = API_KEY;
    this.baseURL = HUGGING_FACE_API_URL;
  }

  // Generate seat recommendations using AI
  async getSeatRecommendations(flightData, aircraftData, userPreferences, customPrompt) {
    try {
      // Validate API key
      if (!this.apiKey) {
        throw new Error('Hugging Face API key not configured');
      }

      // Create the prompt for the AI, now including customPrompt
      const prompt = this.createPrompt(flightData, aircraftData, userPreferences, customPrompt);
      console.log('=== AI PROMPT SENT TO HUGGING FACE ===');
      console.log(prompt);

      // Hugging Face API has a payload size limit (~20KB). Warn if prompt is too large.
      if (Buffer.byteLength(prompt, 'utf8') > 18000) {
        throw new Error('Prompt too large for Hugging Face API. Please reduce the number of available seats.');
      }

      // Call Hugging Face API
      const response = await axios.post(
        this.baseURL,
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            do_sample: true,
            return_full_text: false
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Print the raw AI response for debugging
      console.log('=== RAW AI RESPONSE ===');
      console.log(JSON.stringify(response.data, null, 2));

      // Parse AI response
      const aiResponse = response.data[0]?.generated_text || '';
      return this.parseAIResponse(aiResponse);

    } catch (error) {
      console.error('AI API Error:', error);
      // Fallback to basic recommendations if AI fails
      return this.getFallbackRecommendations(flightData, aircraftData, userPreferences, error.message);
    }
  }

  // Create the AI prompt with all flight data and custom prompt if provided
  createPrompt(flightData, aircraftData, userPreferences, customPrompt) {
    let userCustom = '';
    if (customPrompt && customPrompt.trim()) {
      userCustom = `\n- User's Custom Prompt: ${customPrompt.trim()}`;
    }

    // Summarize available seats by type and side
    let availableSeats = [];
    if (aircraftData.seats && Array.isArray(aircraftData.seats) && aircraftData.seats.length > 0) {
      availableSeats = aircraftData.seats.filter(seat => seat.isAvailable !== false);
    }
    const seatSummary = availableSeats.reduce((acc, seat) => {
      const key = `${seat.seatType}_${seat.side}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    // Show only a few sample seats to avoid huge payloads
    const sampleSeats = availableSeats.slice(0, 5);

    return `You are an expert airline seat recommendation AI. Your job is to recommend the top 3 best available seats for a passenger based on all the provided flight, aircraft, and user preference data, including any custom prompt from the user. Use all the data below to make your decision.

Return ONLY a JSON object in this format (no extra text):
{
  "recommendedSeats": [
    {
      "seatNumber": "<seat_number>",
      "score": <score>,
      "reason": "<reason>"
    }
  ],
  "bestSeat": "<seat_number>",
  "summary": "<summary>"
}

Inputs:
- Aircraft: ${aircraftData.model}
- Aircraft Configuration: ${aircraftData.configuration}
- Total Rows: ${aircraftData.totalRows}
- Seats Per Row: ${aircraftData.seatsPerRow}
- Departure City: ${flightData.departure?.city || 'Unknown'}
- Arrival City: ${flightData.arrival?.city || 'Unknown'}
- Flight Direction: ${userPreferences.flightDirection}
- Departure Time: ${userPreferences.departureTime}
- User Preference: ${userPreferences.preference}
- Flight Date: ${flightData.date || 'Today'}${userCustom}

- Available Seats Summary: ${JSON.stringify(seatSummary)}
- Example available seats: ${JSON.stringify(sampleSeats)}

Instructions:
- Only consider seats in the provided available seats list.
- Recommend the top 3 seats as an array in "recommendedSeats" (ranked best first).
- For each seat, provide a score (0-100) and a short reason.
- Set "bestSeat" to the seatNumber of the top seat.
- Write a one-sentence summary in "summary".
- Return only the JSON object, no extra text.`;
  }

  // Parse AI response to extract JSON
  parseAIResponse(aiResponse) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        return JSON.parse(jsonString);
      }
      
      // If no JSON found, return fallback
      throw new Error('No JSON found in AI response');
      
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return null;
    }
  }

  // Fallback recommendations if AI fails
  getFallbackRecommendations(flightData, aircraftData, userPreferences, errorMsg) {
    const { preference, flightDirection } = userPreferences;
    
    // Basic logic for fallback
    let recommendedSeats = [];
    
    if (preference === 'sunrise') {
      if (flightDirection === 'east') {
        recommendedSeats = [
          { seatNumber: '12A', score: 90, reason: 'Left window seat - perfect for sunrise views on eastbound flights' },
          { seatNumber: '15A', score: 85, reason: 'Left window seat - excellent sunrise visibility' },
          { seatNumber: '8A', score: 80, reason: 'Left window seat - good sunrise viewing angle' }
        ];
      } else {
        recommendedSeats = [
          { seatNumber: '12F', score: 90, reason: 'Right window seat - good for sunrise views' },
          { seatNumber: '15F', score: 85, reason: 'Right window seat - excellent visibility' }
        ];
      }
    } else if (preference === 'sunset') {
      if (flightDirection === 'west') {
        recommendedSeats = [
          { seatNumber: '12F', score: 90, reason: 'Right window seat - perfect for sunset views on westbound flights' },
          { seatNumber: '15F', score: 85, reason: 'Right window seat - excellent sunset visibility' }
        ];
      } else {
        recommendedSeats = [
          { seatNumber: '12A', score: 90, reason: 'Left window seat - good for sunset views' },
          { seatNumber: '15A', score: 85, reason: 'Left window seat - excellent visibility' }
        ];
      }
    } else {
      // Both preferences
      recommendedSeats = [
        { seatNumber: '12A', score: 85, reason: 'Left window seat - good for both sunrise and sunset' },
        { seatNumber: '12F', score: 85, reason: 'Right window seat - good for both sunrise and sunset' },
        { seatNumber: '15A', score: 80, reason: 'Left window seat - balanced viewing options' }
      ];
    }

    return {
      recommendedSeats: recommendedSeats.map(seat => ({
        ...seat,
        reason: errorMsg ? `Fallback: ${errorMsg}` : seat.reason
      })),
      bestSeat: recommendedSeats[0]?.seatNumber || '12A',
      summary: `Best seat for ${preference} views on ${flightDirection}bound flight`
    };
  }
}

module.exports = new AIService();
