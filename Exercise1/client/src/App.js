import React from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Listings from './Pages/Listings';
import Listing from './Pages/Listing';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Listings} />

      <Switch>
        <Route exact path="/listing/:id" children={<Listing />} />
      </Switch>
    </Router>
  );
}

export default App;
