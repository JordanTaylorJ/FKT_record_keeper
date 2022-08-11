import React, {useState} from 'react';
import NewAthlete from './NewAthlete';
import EditAthleteList from './EditAthleteList';
import ReadAthleteList from './ReadAthleteList';
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
    const [editAthleteId, setEditAthelteId] = useState(null);
    const [editAthleteData, setEditAthleteData] = useState({
      name: "",
      time: "",
      trail_id: thisTrail,
      unsupported: false
  })
    

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

    /*
    const handleEditAthlete = (e, updateAthlete) => {
      fetch(`http://localhost:9292/athletes/${e.target.value}`, {
        method: 'PATCH',
        headers: { 
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(updateAthlete),
      })
      .then((r) => r.json())
      .then((updateAthlete) => handleDeleteAthleteTrails(updateAthlete))
    }
    */

    const handleEditAthleteClick = (e, athlete) => {
      e.preventDefault();
      setEditAthelteId(athlete.id);

      const formValues = {
        name: athlete.name,
        time: athlete.time,
        trail_id: athlete.trailId,
        unsupported: athlete.unsupported
      }
      setEditAthleteData(formValues);

    }

    const handleEditFormChange = (e) => {
      e.preventDefault();
      const athleteName = e.target.getAttribute("name")
      const athleteValue = e.target.value 

      const newAthleteData = {...editAthleteData }
      newAthleteData[athleteName] = athleteValue 

      setEditAthleteData(newAthleteData)
    }
    
    
    
      return (
        <>
          <h1> Athlete List {location.state.id} </h1>
          <NewAthlete handleAddAthlete={handleAddAthlete} trailId={location.state.id}/>
          {athletes.length > 0 && (
            <form>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="right">Time</TableCell>
                      <TableCell align="right">Unsupported</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {athletes.map((athlete) => (
                      <>
                      { editAthleteId === athlete.id ? (
                        <EditAthleteList 
                          editAthleteData={editAthleteData} 
                          handleEditFormChange={handleEditFormChange}
                        /> 
                      ) : ( 
                        <ReadAthleteList 
                          athlete={athlete} 
                          handleEditAthleteClick = {handleEditAthleteClick} 
                          handleDeleteAthlete={handleDeleteAthlete} 
                        />
                      )}
                        
                        
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer> 
          </form>
          )}
        </>
      )
    
    
}


export default AthleteList;
