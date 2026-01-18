import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
    const navigate = useNavigate();
    const [ name, setName ] = useState("");
    const [ date, setDate ] = useState("");

    return (
        <div>
            <h2>Search Theatres in your location</h2>
            <input placeholder='Movie Name' onChange={e => setName(e.target.value)} />
            <input type='date' onChange={e => setDate(e.target.value)} />
            <button onClick={() => navigate("/movies", {state:{name,date}})}>Search</button>
        </div>
    )
}

export default Search