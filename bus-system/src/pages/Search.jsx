import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Search() {
    const navigate = useNavigate();
    const [source,setSource] = useState("");
    const [dest,setDest] = useState("")
    const [date,setDate] = useState("") 
    return (
        <div>
            <h2>Search Buses</h2>
            <input placeholder='Source' onChange={e => setSource(e.target.value)} />
            <input placeholder='Destination' onChange={e => setDest(e.target.value)} />
            <input type='date' onChange={e => setDate(e.target.value)} />
            <button onClick={() => navigate("/buses",{state:{source,dest,date}})}>
                Search
            </button>

        </div>
    )
}

export default Search