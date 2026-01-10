const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // change if needed
  password: "",      // add password if configured
  database: "memory_game"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL connected successfully.");
  }
});

module.exports = db;
