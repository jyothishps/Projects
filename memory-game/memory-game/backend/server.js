const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const scoreRoutes = require("./routes/score");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/score", scoreRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
