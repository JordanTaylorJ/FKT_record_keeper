import React from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const TrailList = ({trails}) => {

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
    ];

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `newtrail`;
        navigate(path);
    }

    if (!trails) return <h2>Loading...</h2>

    return(
        <Box sx={{ height: 630, width: '100%' }}>
            <DataGrid
                rows={trails}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onCellClick={routeChange}
            />
      </Box>
    )
}


export default TrailList;