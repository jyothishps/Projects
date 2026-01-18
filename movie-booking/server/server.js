import express from "express";
import cors from "cors"
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/book",(req,res) =>{
    const { username, tickets,movie,date,name } = req.body;
    const totalPrice = movie.price * tickets;
    const sql = "INSERT INTO movie_bookings (user_name, movie_name, theatre_name, show_date, show_time, seats, total_price) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [username,name,movie.theatre,date,movie.time,tickets,totalPrice], (err) => {
        if(err) throw err;
        res.send("Booking successful");
    });
});

app.listen(5000,() => {
    console.log("Server running on port 5000");
});