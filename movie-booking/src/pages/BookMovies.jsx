import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';

function BookMovies() {
    const { state } = useLocation();
    const { movie, name, date } = state;
    const navigate = useNavigate();
    const [ username, setUsername ] = useState("");
    const [ tickets, setTickets ] = useState(1);

    const bookMovie = async () => {
        await axios.post("http://localhost:5000/book", {
            username,
            tickets,
            movie,
            date,
            name
        });

        navigate("/confirm",{
            state:{username,tickets,movie,date,name}
        });
    }
    return (
        <div>
            <h2>Book Movie - {name}</h2>
            <input placeholder='Username' onChange={e => setUsername(e.target.value)} />
            <input type='number' min={1} onChange={e => setTickets(parseInt(e.target.value))} />
            <button onClick={bookMovie}>Confirm</button>
        </div>
    )
}

export default BookMovies