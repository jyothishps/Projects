const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hash],
    (err) => {
      if (err) return res.json({ status: "error", err });
      res.json({ status: "ok" });
    }
  );
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.json({ status: "error", err });
    if (results.length === 0) return res.json({ status: "no user" });

    const user = results[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.json({ status: "wrong password" });

    const token = jwt.sign({ id: user.id }, "secret123");

    res.json({ status: "ok", token, user });
  });
});

module.exports = router;
