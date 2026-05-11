require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const app = express();

// Middleware
// app.use(helmet()); // Temporarily disable for debugging
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000'
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api', authRoutes);
app.use('/api/ai', aiRoutes);

// Base sanity check route
app.get('/', (req, res) => {
  res.send('SmartStudy AI API is running...');
});

// Connect to MongoDB then start server
const startServer = async () => {
  if (!process.env.MONGO_URI || process.env.MONGO_URI === 'your_mongodb_cluster_connection_string_here') {
    console.log('WARNING: No valid MONGO_URI set. Skipping DB connection.');
  } else {
    await connectDB();
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
