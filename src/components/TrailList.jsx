import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const TrailList = () => {

    const [trails, setTrails] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292/trails")
        .then((r) => r.json())
        .then((trails) => setTrails(trails));
    }, [])

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
        /*<div> 
            {trails.map((trail) => 
                <h1>{trail.name}</h1>
            )}
        </div>*/
    )
}

/*
import * as React from 'react';




const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo() {
  return (

  );
}
*/

export default TrailList;