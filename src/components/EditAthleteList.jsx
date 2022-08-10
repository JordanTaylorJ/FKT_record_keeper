import React, {useState} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const EditAthleteList = () => {

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                <input type="text" name="name" placeholder="Enter a name..." />
            </TableCell>
            <TableCell align="right">
                <input type="text" name="name" placeholder="Enter a name..."/>
            </TableCell>
            <TableCell align="right">
                <input type="text" name="name" placeholder="Enter a name..."/>
            </TableCell>
        </TableRow>
        
    )

}

export default EditAthleteList;

