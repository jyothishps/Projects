const express = require("express");
const router = express.Router();
const db = require("../db");

// Add movie to watchlist
router.post("/add", (req, res) => {
  const { user_id, movie_id, title, poster } = req.body;

  db.query(
    "INSERT INTO watchlist (user_id, movie_id, title, poster) VALUES (?, ?, ?, ?)",
    [user_id, movie_id, title, poster],
    (err) => {
      if (err) return res.json({ status: "error", err });
      res.json({ status: "added" });
    }
  );
});

// Fetch watchlist
router.get("/:user_id", (req, res) => {
  db.query(
    "SELECT * FROM watchlist WHERE user_id = ?",
    [req.params.user_id],
    (err, results) => {
      if (err) return res.json({ status: "error", err });
      res.json(results);
    }
  );
});

// Remove
router.delete("/remove/:id", (req, res) => {
  db.query("DELETE FROM watchlist WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.json({ status: "error", err });
    res.json({ status: "removed" });
  });
});

module.exports = router;
