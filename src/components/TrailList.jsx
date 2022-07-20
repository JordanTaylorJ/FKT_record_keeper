import React, {useEffect, useState} from 'react';

const TrailList = () => {

    const [trails, setTrails] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292/trails")
        .then((r) => r.json())
        .then((trails) => setTrails(trails));
    }, [])

    if (!trails) return <h2>Loading...</h2>

    return(
        <div> 
            {trails.map((trail) => 
                <h1>{trail.name}</h1>
            )}
        </div>
    )
}

export default TrailList;