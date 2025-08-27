module.exports = {
  PORT: process.env.PORT || 5001,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/seat-recommender',
  NODE_ENV: process.env.NODE_ENV || 'development',
  HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY
};
