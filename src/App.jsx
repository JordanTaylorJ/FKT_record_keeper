import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import TrailList from './components/TrailList';
import NewTrail from './components/NewTrail';

function App() {

  const [trails, setTrails] = useState([]);

  useEffect(() => {
      fetch('http://localhost:9292/trails')
      .then((r) => r.json())
      .then((trails) => setTrails(trails));
  }, []);

  return (
    <Router className='App'>
      <Routes>
        <Route path="/" element={<TrailList trails={trails}/>} />
        <Route path="newtrail" element={<NewTrail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
