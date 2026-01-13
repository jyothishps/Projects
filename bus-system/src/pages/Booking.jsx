import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Booking() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { bus, date } = state

    const [username, setUsername] = useState("")
    const [seats, setSeats] = useState(1);

    const bookBus = async () => {
        await axios.post("http://localhost:5000/book", {
            username,
            seats,
            bus,
            date
        });

        navigate("/confirm", {
            state:{username,seats,bus,date}
        });
    };

    return (
        <div>
            <h2>Booking - {bus.name}</h2>
            <input placeholder='User Name' onChange={e => setUsername(e.target.value)} />
            <input type='number' min={1} onChange={e => setSeats(e.target.value)} />
            <button onClick={bookBus}>Confirm Booking</button>
        </div>
    );
}

export default Booking