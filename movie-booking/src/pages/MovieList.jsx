import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

function MovieList() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const movies = [
        { id:1,theatre:"EVM Cinemas", time:"11AM", price:160, seats: 30},
        { id:2,theatre:"Ann Cinemas", time:"9PM", price:150, seats: 30},
        { id:3,theatre:"Aashirvaad Cinemas", time:"12PM", price:10, seats: 30},
    ];

    return (
        <div>
            <h2>Movie List</h2>
            {movies.map(movie => (
                <p key={movie.id}>
                    Movie Name : {state.name} | Theatre : {movie.theatre}
                    Show Time : {movie.time} | Available Seats : {movie.seats}
                    Price : {movie.price}
                    <button onClick={() => navigate("/booking",{state:{movie,name:state.name,date:state.date}})}>Book</button>
                </p>
            ))};
        </div>
    )
}

export default MovieList