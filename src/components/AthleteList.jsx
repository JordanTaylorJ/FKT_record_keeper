import React, {useState} from 'react';
import NewAthlete from './NewAthlete';
import { useNavigate, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const AthleteList = ({trails, setTrails}) => {

    const [athletes, setAthletes] = useState([]);
    let location = useLocation();

    // useEffect((id) => {
    //     console.log(location);
    //     fetch(`http://localhost:9292/trails/${location.state.id}`)
    //     .then((r) => r.json())
    //     .then((trail) => setAthletes(trail.athletes));
    // }, []);

    const handleAddAthlete = (newAthlete) => {
        fetch("http://localhost:9292/athletes", {
            method: 'POST',
            headers: { 
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(newAthlete),
          })
          .then(r => r.json())
          .then((data) => setAthletes(data))
          .then((data) => handleAddNewTrail(data))
    }


    const handleAddNewTrail = () => {
      console.log("before submit", athletes, trails)
      const newTrails = trails.map((trail) => { 
        if (trail.id === location.state.id)
          return {
            ...trail, 
            athletes: athletes 
          } 
        else {
            return trail
          }
      })
      setTrails(newTrails)
      setAthletes([])
    }
    console.log("after submit", athletes, trails)

    //debugger
    //const trailId = trails.find(trail => trail.id === location.state.id)
    //const newTrail = (...trailId, athletes: data)
    //setTrails(trails.map(trail) => if (trail.id === trailId)  )

    
    //newTrail = [...thisTrail, athletes: [... theTrail.athletes, data]]
    //this trail =trails.map
    //map through trails  replace the one changed 
    
    //const newTrails = [...trails,]
    //setTrails([...trails])

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
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
    if (trails.length > 0) {

    return(
        <div>   
            <h1> Athlete List {location.state.id} </h1>
            <NewAthlete handleAddAthlete={handleAddAthlete} trailId={location.state.id}/>
    
            <Box sx={{ height: 630, width: '100%' }}>
                <DataGrid
                    rows={trails.find(trail => trail.id === location.state.id).athletes}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    //onCellClick={routeChange}
                />
            </Box>
        </div>
    )
    }
    else return null
}

export default AthleteList;