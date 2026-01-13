import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/book", (req, res) => {
  const { username, bus, seats, date } = req.body;
  const totalPrice = seats * bus.price;

  const sql = "INSERT INTO booking VALUES (NULL, ?, ?, ?, ?, ?)";
  db.query(sql,
    [username, bus.name, seats, totalPrice, date],
    (err) => {
      if (err) throw err;
      res.send("Booking Successful");
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
