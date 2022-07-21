import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const TrailList = ({trails}) => {


    /*
    "id": 55,
    "name": "Baltistan Peak",
    "location": "Siachen Karakoram",
    "distance": 336,
    "elevation_gain": 6425,
    "created_at": "2022-07-21T16:45:15.397Z",
    "updated_at": "2022-07-21T16:45:15.397Z"
    */

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Route',
          width: 150,
          editable: true,
        },
        {
          field: 'location',
          headerName: 'Location',
          width: 150,
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
          sortable: false,
          width: 160,
        },
    ];


    if (!trails) return <h2>Loading...</h2>

    return(
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={trails}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
      </Box>
    )
}


export default TrailList;