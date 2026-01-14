import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/add", (req, res) => {
  const { sender, recepient, weight, distance, totalCost } = req.body;
  const shipmentId = "SHIP" + Math.floor(Math.random() * 10000);

  const sql = `
    INSERT INTO shipments
    (shipment_id, sender, receiver, weight, distance, cost, status, received_date)
    VALUES (?,?,?,?,?,?,?,CURDATE())
  `;

  db.query(
    sql,
    [shipmentId, sender, recepient, weight, distance, totalCost, "In Transit"],
    (err) => {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.send("Inserted");
      }
    }
  );
});

app.get("/track/:id", (req, res) => {
  const sql = "SELECT status FROM shipments WHERE shipment_id=?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.send("Error");
    } else {
      res.send(result[0]);
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
