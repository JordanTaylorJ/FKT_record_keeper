import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/Home';
import TrailList from './components/TrailList';
import NewTrail from './components/NewTrail';

function App() {

  const [trails, setTrails] = useState([]);

  useEffect(() => {
      fetch("http://localhost:9292/trails")
      .then((r) => r.json())
      .then((trails) => setTrails(trails));
  }, []);

  return (
    <>
      <Home />
      <TrailList trails={trails}/>
    </>
  );
}

export default App;
