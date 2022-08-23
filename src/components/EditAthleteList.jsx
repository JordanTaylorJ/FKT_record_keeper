import React, {useState} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const EditAthleteList = ({ athlete, editAthleteData, handleEditFormChange, handleCancelEditClick }) => {

    return (
        <TableRow
            key={athlete.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter a name..." 
                    value={editAthleteData.name}
                    onChange={handleEditFormChange} 
                />
            </TableCell>
            <TableCell align="right">
                <input 
                    type="text" 
                    name="time" 
                    placeholder="Enter a time..." 
                    value={editAthleteData.time}
                    onChange={handleEditFormChange} 
                />
            </TableCell>
            <TableCell align="right">
                <input 
                    type="checkbox" 
                    name="unsupported" 
                    value={editAthleteData.unsupported}
                    onChange={handleEditFormChange} 
                />
            </TableCell>
            <TableCell align="right">
                <button type="submit" value={editAthleteData.id}>
                    Save
                </button>
                <button type="button" onClick={handleCancelEditClick}>
                    Cancel
                </button>
            </TableCell>
        </TableRow>
        
    )

}

export default EditAthleteList;

