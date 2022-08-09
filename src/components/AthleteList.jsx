import React, {useState} from 'react';
import NewAthlete from './NewAthlete';
import { useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AthleteList = ({trails, setTrails}) => {


    let location = useLocation();

    const thisTrail = trails.find(trail => trail.id == location.state.id)
    const [athletes, setAthletes] = useState(thisTrail.athletes);
    

    const handleDeleteAthlete = (e) => {
      fetch(`http://localhost:9292/athletes/${e.target.value}`, {
        method: 'DELETE',
      })
      .then((r) => r.json())
      .then((deletedAthlete) => handleDeleteAthleteTrails(deletedAthlete))
    }

    const handleDeleteAthleteTrails = (deletedAthlete) => {
      const updateAthletes = athletes.filter((athlete) => athlete.id !== deletedAthlete.id);
      const newTrails = trails.map((trail) => { 
        if (trail.id === deletedAthlete.trail_id)
          return ({
            ...trail, 
            athletes: [updateAthletes]
          }); else {
            return trail;
          }
      })
      setAthletes(updateAthletes);
      setTrails(newTrails);
    }

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
      const updateAthletes = [...athletes, athlete];
      const newTrails = trails.map((trail) => { 
        if (trail.id === athlete.trail_id)
          return ({
            ...trail, 
            athletes: [updateAthletes]
          }); else {
            return trail;
          }
      })
      setAthletes(updateAthletes);
      setTrails(newTrails);
    }  

    if (athletes.length > 0) {
    
      return (
        <>
        <h1> Athlete List {location.state.id} </h1>
        <NewAthlete handleAddAthlete={handleAddAthlete} trailId={location.state.id}/>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Unsupported</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {athletes.map((athlete) => (
                <TableRow
                  key={athlete.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <button
                      value={athlete.id}
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginLeft: 16 }}
                      onClick={handleDeleteAthlete}
                    > 
                      x
                    </button>
                    <button
                      value={athlete.id}
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginLeft: 16 }}
                      //onClick={editAthleteData}
                    > 
                      Edit
                    </button>
                  </TableCell>
                  <TableCell component="th" scope="row">{athlete.name}</TableCell>
                  <TableCell align="right">{athlete.time}</TableCell>
                  <TableCell align="right">{athlete.unsupported}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> 
        </>
      )
    } else return null
    
}

export default AthleteList;
