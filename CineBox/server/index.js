import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import watchlistRoutes from './routes/watchlist.js';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('CineBox API is running');
});

// Database Connection Check
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to MySQL database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
