import React, {useState} from 'react';

const NewAthlete = ({handleAddAthlete, trailId}) => {

    const [newAthlete, setNewAthlete] = useState({
        name: "",
        time: "",
        trail: trailId,
        supported: ""
    });

    const handleChange = (e) => {
        
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setNewAthlete({...newAthlete, [name]:value})
        console.log(newAthlete)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit clicked inside NewAthlete", newAthlete)
        handleAddAthlete(newAthlete)
    };

    return(
        <div>
        <p>Add an Athlete Time:</p>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label> Name:
                <input type="text" name="name" value={newAthlete.name} onChange={handleChange} />
            </label>
            <label> Time:
                <input type="text" name="time" value={newAthlete.time} onChange={handleChange} />
            </label>
            <label> Supported:
                <input type="checkbox" name="supported" value={newAthlete.supported} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        </div>
    )
}

export default NewAthlete;