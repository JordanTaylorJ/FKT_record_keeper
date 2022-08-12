import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import TrailList from './components/TrailList';
import AthleteList from './components/AthleteList';
import NavBar from './components/NavBar';
import {ThemeProvider, createTheme } from '@mui/material/styles';



function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#67a392',
      },
      secondary: {
        main: '#9c9a56',
        dark: '#757446', 
      },
    },
    components: {
      MuiButton: {
            color: ""
      }
    }
  });

  const [trails, setTrails] = useState([]);

  useEffect(() => {
      fetch('http://localhost:9292/trails')
      .then((r) => r.json())
      .then((trails) => setTrails(trails));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router className='App'>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="trails" element={<TrailList trails={trails} setTrails={setTrails}/>} />
          <Route path="trails/athletes" element={<AthleteList trails={trails} setTrails={setTrails}/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
