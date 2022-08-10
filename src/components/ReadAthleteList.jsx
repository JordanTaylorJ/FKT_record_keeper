import React, {useState} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


const ReadAthleteList = ({athlete, handleDeleteAthlete, handleEditAthlete}) => {

    return(
        <TableRow
            key={athlete.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left">{athlete.name}</TableCell>
            <TableCell align="right">{athlete.time}</TableCell>
            <TableCell align="right">
                {athlete.unsupported === true ? 'true' : 'false'}
            </TableCell>
            <TableCell>
                <button
                    value={athlete.id}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={(e) => handleEditAthlete(e, athlete)}
                > 
                Edit
                </button>
                <button
                    value={athlete.id}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={handleDeleteAthlete}
                > 
                x
                </button>
            </TableCell>
        </TableRow>
    )
}

export default ReadAthleteList;

//component="th" scope="row"