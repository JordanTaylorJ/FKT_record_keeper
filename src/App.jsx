import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import TrailList from './components/TrailList';
import AthleteList from './components/AthleteList';
import NavBar from './components/NavBar';


function App() {

  const [trails, setTrails] = useState([
    //{athletes: []}
  ]);

  useEffect(() => {
      fetch('http://localhost:9292/trails')
      .then((r) => r.json())
      .then((trails) => setTrails(trails));
  }, []);

  return (
    <Router className='App'>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="trails" element={<TrailList trails={trails}/>} />
        <Route path="trails/athletes" element={<AthleteList trails={trails} setTrails={setTrails}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
