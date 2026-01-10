import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware to ensure user is logged in
router.use(authenticateToken);

// Get user's watchlist
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      'SELECT * FROM watchlist WHERE user_id = ? ORDER BY added_at DESC',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add to watchlist
router.post('/add', async (req, res) => {
  const { movie_id, title, poster_path } = req.body;
  const userId = req.user.id;

  if (!movie_id || !title) {
    return res.status(400).json({ message: 'Movie ID and Title are required' });
  }

  try {
    await pool.query(
      'INSERT INTO watchlist (user_id, movie_id, title, poster_path) VALUES (?, ?, ?, ?)',
      [userId, movie_id, title, poster_path]
    );
    res.status(201).json({ message: 'Added to watchlist' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Movie already in watchlist' });
    }
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Remove from watchlist
router.delete('/remove/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user.id;

  try {
    await pool.query(
      'DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?',
      [userId, movieId]
    );
    res.json({ message: 'Removed from watchlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Check if in watchlist
router.get('/check/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user.id;

  try {
    const [rows] = await pool.query(
      'SELECT 1 FROM watchlist WHERE user_id = ? AND movie_id = ?',
      [userId, movieId]
    );
    res.json({ inWatchlist: rows.length > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
