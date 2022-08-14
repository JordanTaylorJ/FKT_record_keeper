import React, {useState} from 'react';

const NewTrail = ({handleAddTrail}) => {

    const [newTrail, setNewTrail] = useState({
        name: "",
        location: "",
        distance: "",
        elevation_gain: "",
        athletes: []
    })

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setNewTrail({...newTrail, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTrail(newTrail);
        setNewTrail({
            name: "",
            location: "",
            distance: "",
            elevation_gain: "", 
            athletes: []
        });
    }

    return(
        <div>
        <p>Add a Trail:</p>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label> Name:
                <input type="text" name="name" placeholder="Enter a name..." value={newTrail.name} onChange={handleChange} />
            </label>
            <label> Location:
                <input type="text" name="location" placeholder="Enter a location..." value={newTrail.location} onChange={handleChange} />
            </label>
            <label> Distance:
            <input type="text" name="distance" placeholder="Enter a distance..." value={newTrail.distance} onChange={handleChange} />
            </label>
            <label> Elevation Gain:
                <input type="text" name="elevation_gain" placeholder="Enter the elevation gain..." value={newTrail.elevation_gain} onChange={handleChange} />
            </label>
            
            <input type="submit" value="Submit" />
        </form>
        </div>
    )
}


export default NewTrail;