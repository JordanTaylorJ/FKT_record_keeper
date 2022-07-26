import React from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import NewTrail from './NewTrail';


const TrailList = ({trails, setTrails}) => {

  const renderDetailsButton = (params) => {
    return (
      <strong>
          <button
              value={params.row.id}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={routeChange}
          > 
              Athlete Info
          </button>
      </strong>
    )
  }

    const columns = [
        { 
          field: 'id', 
          headerName: 'Athletes',  
          width: 160,
          sortable: false,
          renderCell: renderDetailsButton,
          disableClickEventBubbling: true
        },
        {
          field: 'name',
          headerName: 'Route',
          width: 170,
          editable: true,
        },
        {
          field: 'location',
          headerName: 'Location',
          width: 170,
          editable: true,
        },
        {
          field: 'distance',
          headerName: 'Distance',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'elevation_gain',
          headerName: 'Elevation Gain (ft.)',
          type: 'number',
          sortable: true,
          width: 160,
        },
    ];



    let navigate = useNavigate();
    const routeChange = (e) => {
      let path = `athletes`;
      navigate(path, { state: { id: e.target.value } } );
    }

    const handleAddTrail = (newTrail) => {
      fetch("http://localhost:9292/trails", {
          method: 'POST',
          headers: { 
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(newTrail),
        })
        .then(r => r.json())
        .then((newTrail) => handleAddTrailToTrails(newTrail))
  }

  const handleAddTrailToTrails = (newTrail) => {
    const newTrails = [...trails, newTrail];
    setTrails(newTrails);
  }

    if (!trails) return <h2>Loading...</h2>

    return(
      <div>
        <h1> Trails </h1>
        <NewTrail 
          handleAddTrail={handleAddTrail}
        />
        <Box sx={{ height: 630, width: '100%' }}>
            <DataGrid
                rows={trails}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </Box>
      </div>
    )
}


export default TrailList;