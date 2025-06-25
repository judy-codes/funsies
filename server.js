const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import our AI Judy class
const AIJudy = require('./scripts/ai-judy');

const app = express();
const PORT = process.env.PORT || 3001;

// Safe CORS configuration for both dev and prod
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://judy-codes.github.io',
      'https://judy-codes.github.io/funsies'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Allow cookies if needed
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// AI Judy API endpoint
app.post('/api/ai-judy/ask', async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required and must be a string' });
    }

    const aiJudy = new AIJudy();
    const result = await aiJudy.generateResponse(question);
    
    res.json(result);
  } catch (error) {
    console.error('Error in AI Judy API:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Judy API is running' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 AI Judy server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
}); 