import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/Home';
import TrailList from './components/TrailList';

function App() {
  return (
    <>
      <p>hey </p>
      <Home />
      <TrailList/>
    </>
  );
}

export default App;
