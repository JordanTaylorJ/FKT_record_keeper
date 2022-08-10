import React, {useState} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const EditAthleteList = ({ editAthleteData, handleEditFormChange }) => {

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter a name..." 
                    onChange={handleEditFormChange} 
                />
            </TableCell>
            <TableCell align="right">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter a time..." 
                    onChange={handleEditFormChange} 
                />
            </TableCell>
            <TableCell align="right">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="this should be a checkbox lol" 
                    onChange={handleEditFormChange} 
                />
            </TableCell>
        </TableRow>
        
    )

}

export default EditAthleteList;

