const express = require("express");
const router = express.Router();
const db = require("../db");

// Save score
router.post("/save-score", (req, res) => {
  const { userId, attempts, timeTaken } = req.body;

  db.query(
    "INSERT INTO scores (user_id, attempts, time_taken) VALUES (?, ?, ?)",
    [userId, attempts, timeTaken],
    (err, result) => {
      if (err) return res.status(400).json({ error: err });
      res.json({ message: "Score saved!" });
    }
  );
});

// Leaderboard
router.get("/leaderboard", (req, res) => {
  db.query(
    "SELECT users.username, scores.attempts, scores.time_taken FROM scores JOIN users ON scores.user_id = users.id ORDER BY attempts ASC LIMIT 10",
    (err, results) => {
      if (err) return res.status(400).json({ error: err });
      res.json(results);
    }
  );
});

module.exports = router;
