import React, {useEffect, useState} from 'react';

const TrailList = () => {

    const [trails, setTrails] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292")
        .then((r) => r.json())
        .then((trails) => setTrails(trails));
    })

    if (!trails) return <h2>Loading...</h2>

    return(
        <div> 
            <h2>{trails}</h2>
        </div>
    )
}

export default TrailList;