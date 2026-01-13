import React from 'react'
import { useLocation } from 'react-router-dom'

function Confirmation() {
    const { state } = useLocation();
    const total = state.seats * state.bus.price;

    return (
        <div>
            <h2>Book Confirmation</h2>
            <p>Name: {state.username}</p>
            <p>Bus: {state.bus.name}</p>
            <p>Seats: {state.seats}</p>
            <p>Travel Date: {state.date}</p>
            <p>Total Price: Rs.{total}</p>
        </div>
    )
}

export default Confirmation