import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function BusList() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const buses = [
        {id:1, name:"KSRTC",time:"9AM", price:500},
        {id:2, name:"Private Travels", time:"1PM", price:650}
    ];

    return (
        <div>
            <h2>Available Buses</h2>
            {buses.map(bus => (
                <div key={bus.id}>
                    <p>{bus.name} | {bus.time} | Rs.{bus.price}</p>
                    <button onClick={() => navigate("/booking",{state:{bus,date:state.date}})}>
                        Book
                    </button>
                </div>
            ))}
        </div>
    )
}

export default BusList