import React from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import AppFrame from './Pages/AppFrame';
import Login from './Pages/Login';
import Listings from './Pages/Listings';
import Listing from './Pages/Listing';

function App() {
  return (
    <>
      <AppFrame />
      <Router>
        <Route exact path="/" component={Listings} />
        <Route exact path="/login" component={Login} />

        <Switch>
          <Route exact path="/listing/:id" children={<Listing />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
