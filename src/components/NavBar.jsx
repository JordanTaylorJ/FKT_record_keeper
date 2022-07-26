import * as React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fastest Known Time Records
          </Typography>
          <Button color="inherit" component={Link} to=''>Home</Button>
          <Button color="inherit" component={Link} to='trails'>Trails</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

