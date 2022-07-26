import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const TrailList = ({trails}) => {

  const renderDetailsButton = (params) => {
    return (
      <strong>
          <button
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
        { field: 'id', headerName: 'ID', width: 90 },
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
          headerName: 'Elevation Gain',
          type: 'number',
          sortable: true,
          width: 160,
        },
        {
          field: 'athletes',
          headerName: 'Athletes',
          sortable: false,
          width: 160,
          renderCell: renderDetailsButton,
          disableClickEventBubbling: true,
        },
    ];



    let navigate = useNavigate();
    const routeChange = (e) => {
      console.log(e.value)
      let path = `athlete-list`;
      navigate(path, { state: { id: e.value } } );
    }

    if (!trails) return <h2>Loading...</h2>

    return(
      <div>
        <h1> Trail List </h1>
        <Box sx={{ height: 630, width: '100%' }}>
            <DataGrid
                rows={trails}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                //onCellClick={routeChange}
            />
        </Box>
      </div>
    )
}


export default TrailList;