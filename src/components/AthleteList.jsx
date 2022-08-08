import React, {useState} from 'react';
import NewAthlete from './NewAthlete';
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditAthleteData from './EditAthleteData';

const AthleteList = ({trails, setTrails}) => {


    let location = useLocation();
    
    console.log(location.state.id)
    const thisTrail = trails.find(trail => trail.id == location.state.id)
    console.log("This trail", thisTrail)
    const [athletes, setAthletes] = useState([]);
    console.log('athletes up here', athletes)

    const handleDeleteAthlete = (e) => {
      fetch(`http://localhost:9292/athletes/${e.target.value}`, {
        method: 'DELETE',
      })
      .then((r) => r.json())
      //.then((data) => console.log("THIS WAS DELETED", data))
      .then((deletedAthlete) => handleDeleteAthleteTrails(deletedAthlete))
    }

    const handleDeleteAthleteTrails = (deletedAthlete) => {
      console.log("i was deleted", deletedAthlete)
      const thisTrailAthletes = trails.find(trail => trail.id == location.state.id).athletes
      const updateAthletes = thisTrailAthletes.map((athlete) => {if (athlete.id !== deletedAthlete.id) return athlete})
      const newTrails = trails.map((trail) => { 
        if (trail.id === deletedAthlete.trail_id)
          return ({
            ...trail, 
            athletes: [updateAthletes]
          }); else {
            return trail;
          }
      })
      console.log("after delete", updateAthletes)
      setTrails(newTrails)
    }
    //Delete works!!  returns the seleted object. now find and delete and reset state

    const handleAddAthlete = (newAthlete) => {
        fetch("http://localhost:9292/athletes", {
            method: 'POST',
            headers: { 
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(newAthlete),
          })
          .then(r => r.json())
          .then((athlete) => handleAddAthleteToTrails(athlete))
    }


    const handleAddAthleteToTrails = (athlete) => {
      console.log("data", athlete)
      const thisTrailAthletes = trails.find(trail => trail.id == location.state.id).athletes
      const updateAthletes = [...thisTrailAthletes, athlete]
      const newTrails = trails.map((trail) => { 
        if (trail.id === athlete.trail_id)
          //return (trail.athletes.push(athlete))
          return ({
            ...trail, 
            athletes: [updateAthletes]
          }); else {
            return trail;
          }
      })
      //setAthletes(updateAthlete)
      setTrails(newTrails)
    }
    console.log("trails", trails)

    const renderButtons = (params) => {
      return (
        <strong>
            <button
                value={params.row.id}
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={handleDeleteAthlete}
            > 
                x
            </button>
            <button
                value={params.row.id}
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                //onClick={editAthleteData}
            > 
                Edit
            </button>
        </strong>
      )
    }

    const columns = [
        { 
          field: 'id', 
          headerName: 'Remove Athlete',  
          width: 160,
          sortable: false,
          renderCell: renderButtons,
          disableClickEventBubbling: true
        },
        {
          field: 'name',
          headerName: 'Name',
          width: 170,
          editable: true,
        },
        {
          field: 'time',
          headerName: 'Time',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'suported',
          headerName: 'Style',
          width: 110,
          editable: true,
          },
    ];
    
    //const rows = trails.find(trail => trail.id == location.state.id).athletes
    

    if (trails.length > 0) {
      /*setTimeout(() => {
        console.log("Delayed for 1 second.");
      }, "1000")*/
      //const athletes = trails.find(trail => trail.id == location.state.id).athletes
      return(
        <div>   
            <h1> Athlete List {location.state.id} </h1>
            <NewAthlete handleAddAthlete={handleAddAthlete} trailId={location.state.id}/>
            {//<EditAthleteData/>
            }
            <Box sx={{ height: 630, width: '100%' }}>
            
                <DataGrid 
                    getRowId={(row) => row.id}
                    rows={athletes}
                    //rows={trails.find(trail => trail.id == location.state.id).athletes}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </Box>
        </div>
      )
    }
    else return null
}

export default AthleteList;