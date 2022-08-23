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
    e.preventDefault();
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

    
  const handleEditAthleteSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:9292/athletes/${editAthleteId}`, {
      method: 'PATCH',
      headers: { 
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(editAthleteData),
    })
    .then((r) => r.json())
    .then((updateAthlete) => handleEditAthleteTrails(updateAthlete))
  }

  const handleEditAthleteTrails = (updateAthlete) => {
    const updatedAthletes = athletes.map((athlete) => {
      if (athlete.id === updateAthlete.id) {
        return updateAthlete;
      } else return athlete;
    })
    const newTrails = trails.map((trail) => { 
      if (trail.id === updateAthlete.trail_id)
        return ({
          ...trail, 
          athletes: [updateAthlete]
        }); else {
          return trail;
        }
    })
    setAthletes(updatedAthletes);
    setTrails(newTrails); 
    setEditAthelteId(null);
  }
  
  //prepopulates the edited athlete in the form
  const handleEditAthleteClick = (e, athlete) => {
    e.preventDefault();
    setEditAthelteId(athlete.id);

    const formValues = {
      id: athlete.id,
      name: athlete.name,
      time: athlete.time,
      trail_id: athlete.trailId,
      unsupported: athlete.unsupported
    }
    setEditAthleteData(formValues);
  }

  //handle change for edit form (updates state as user types)
  const handleEditFormChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setEditAthleteData({...editAthleteData, [name]:value});
  }
    
  const handleCancelEditClick = () => {
    setEditAthelteId(null);
  }
    
  return (
    <>
      <h1> {thisTrail.name} Athlete List </h1>
      <NewAthlete handleAddAthlete={handleAddAthlete} trailId={location.state.id}/>
      {athletes.length > 0 && (
        <form onSubmit={handleEditAthleteSubmit}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Unsupported</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {athletes.map((athlete) => (
                  <>
                  { editAthleteId === athlete.id ? (
                    <EditAthleteList 
                      athlete={athlete} 
                      editAthleteData={editAthleteData} 
                      handleEditFormChange={handleEditFormChange}
                      handleCancelEditClick={handleCancelEditClick}
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
