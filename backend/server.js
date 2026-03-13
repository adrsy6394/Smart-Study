require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);

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
