const db = require("./db");

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const watchlistRoutes = require("./routes/watchlist");
app.use("/watchlist", watchlistRoutes);

