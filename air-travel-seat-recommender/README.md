# ✈️ Air Travel Seat Recommender

A web application that helps air travelers choose the best seats for enjoying scenic views during their flights, particularly for sunrises and sunsets.

## 🚀 Features

- **Smart Seat Recommendations**: Get personalized seat suggestions based on flight direction and timing
- **Interactive Seat Maps**: Visual representation of aircraft seating layouts
- **Flight Search**: Search for available flights between cities
- **Sun Position Calculations**: Determine optimal viewing angles for sunrise/sunset
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 📁 Project Structure

```
air-travel-seat-recommender/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── config.js          # Configuration
│   ├── server.js          # Main server file
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd air-travel-seat-recommender
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/seat-recommender
   NODE_ENV=development
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on http://localhost:5000

2. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```
   The React app will open on http://localhost:3000

## 🎯 How It Works

### Core Algorithm
1. **Flight Analysis**: Analyzes flight direction, timing, and aircraft type
2. **Sun Position**: Calculates optimal viewing angles based on sunrise/sunset times
3. **Seat Mapping**: Maps aircraft seating configurations
4. **Recommendations**: Generates personalized seat suggestions with reasoning

### User Flow
1. User searches for flights or directly requests seat recommendations
2. System analyzes flight parameters (direction, time, aircraft)
3. Algorithm calculates optimal seats for scenic views
4. Results displayed with interactive seat map visualization

## 🔧 API Endpoints

### Seats
- `GET /api/seats/aircraft` - Get all aircraft with seat layouts
- `GET /api/seats/aircraft/:id` - Get specific aircraft details
- `POST /api/seats/recommendations` - Get seat recommendations

### Flights
- `GET /api/flights` - Get all flights
- `GET /api/flights/:id` - Get specific flight details
- `GET /api/flights/route/:departure/:arrival` - Get flights between cities
- `POST /api/flights` - Create new flight

## 🎨 UI Components

- **Header**: Navigation between different sections
- **Home**: Landing page with feature overview
- **FlightSearch**: Search and filter available flights
- **SeatRecommender**: Core recommendation engine with interactive seat map

## 🚧 Future Enhancements

- [ ] Real-time flight data integration
- [ ] Advanced sun position algorithms
- [ ] User accounts and saved preferences
- [ ] Mobile app development
- [ ] Integration with airline booking systems
- [ ] Weather condition considerations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with React and Node.js
- Inspired by travelers who want to capture beautiful moments from the sky
- Special thanks to the aviation community for insights

---

**Happy Flying! ✈️🌅🌄**
