import React, {useState} from 'react';

const NewAthlete = ({handleAddAthlete, trailId}) => {

    const [newAthlete, setNewAthlete] = useState({
        name: "",
        time: "",
        trail_id: trailId,
        unsupported: false
    });

    const editingAthlete = (updateAthlete) => {
        newAthlete(updateAthlete)
    }

    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setNewAthlete({...newAthlete, [name]:value})
        console.log(newAthlete)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddAthlete(newAthlete)
        console.log("submit clicked inside NewAthlete", newAthlete)
        setNewAthlete({
            name: "",
            time: "",
            trail_id: trailId,
            unsupported: false
        })
    };

    return(
        <div>
        <p>Add an Athlete Time:</p>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label> Name:
                <input type="text" name="name" placeholder="Enter a name..." value={newAthlete.name} onChange={handleChange} />
            </label>
            <label> Time:
                <input type="text" name="time" placeholder="Enter a time..." value={newAthlete.time} onChange={handleChange} />
            </label>
            <label> Unsupported:
                <input type="checkbox" name="unsupported" value={newAthlete.unsupported} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        </div>
    )
}

export default NewAthlete;