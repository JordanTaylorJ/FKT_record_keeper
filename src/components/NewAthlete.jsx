import React, {useState} from 'react';

const NewAthlete = ({handleAddAthlete}) => {

    const [newAthlete, setNewAthlete] = useState({
        name: "",
        time: "",
        trail: "",
    });

    const handleChange = (e) => {
        setNewAthlete({...newAthlete, [e.target.name]:e.target.value})
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
            <label> Trail:
                <input type="text" name="trail" value={newAthlete.trail} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        </div>
    )
}

export default NewAthlete;